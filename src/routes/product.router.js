import {Router} from 'express'
import ProductDao from '../daos/dbManager/product.dao.js'
const router = Router()



router.get('/',async (req,res)=>{
    try{
        const { limit,page,query,sort } = req.query
        const productos = await ProductDao.getAllProducts(limit, page, query, sort);
        
   
   
            res.json(productos)
        
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.get('/:pid', async (req,res)=>{
    try{
        
        const{ pid } = req.params
        const producto = ProductDao.getProductById(pid)
        res.json(producto)

    }
    catch(err){
        res.status(500).json({error:err})
    }

    

})

router.post('/', async (req,res)=>{
    try{
        let producto = req.body
        const newProduct = await ProductDao.createProduct(producto)
        res.status(201).json({message: "Producto agregado correctamente"})
    }
    catch(err){
        res.status(500).json({error:err})
    }

})

router.put('/:pid',async (req,res)=>{
    try{
        let productoModificado = req.body
        let modified = await ProductDao.updateProduct(req.params.pid,productoModificado)
        res.status(201).json(modified)
    }
    catch(err){
        res.status(500).json({error:err})
    }    
})

router.delete('/:pid', async (req,res)=>{
    try{
        let deleted =await ProductDao.deleteProduct(req.params.pid)
        res.status(201).json(deleted.message)
    }
    catch(err){ res.status(500).json({error:err})}
    
})
export default router