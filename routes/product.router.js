import {Router} from 'express'
import ProductManager from '../classes/ProductManager.js'
const router = Router()
let manager = new ProductManager('productos.json')
let productos = manager.getProducts()

router.get('/',(req,res)=>{

    const { limit } = req.query
    if(Number(limit)){
        res.json(productos.slice(0,limit))

    }
    else{
        res.json(productos)
    }
    
})

router.get('/:pid',(req,res)=>{

    const{ pid } = req.params
    let producto = manager.getProductById(pid)
    
    res.json(producto)
    

})

router.post('/', (req,res)=>{
    let producto = req.body
    res.send( manager.addProduct(producto))

})

router.put('/:pid', (req,res)=>{
    let productoModificado = req.body
    res.send(manager.updateProduct(Number(req.params.pid),productoModificado))
})

router.delete('/:pid',(req,res)=>{
    res.send(manager.deleteProduct(Number(req.params.pid)))
})
export default router