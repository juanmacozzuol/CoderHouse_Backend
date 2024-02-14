import ProductDao from "../services/product/product.dao.js";



export const getAllProducts = async (req,res)=>{
    try{
        const { limit,page,query,sort } = req.query
        const productos = await ProductDao.getAllProducts(limit, page, query, sort);
        
   
   
            res.json(productos)
        
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

export const getProduct = async (req,res)=>{
    try{
        
        const{ pid } = req.params
        const producto = ProductDao.getProductById(pid)
        res.json(producto)

    }
    catch(err){
        res.status(500).json({error:err})
    }

    

}

export const createProduct = async (req,res)=>{
    try{
        let producto = req.body
        const newProduct = await ProductDao.createProduct(producto)
        res.status(201).json({message: "Producto agregado correctamente"})
    }
    catch(err){
        res.status(500).json({error:err})
    }

}

export const updateProduct = async (req,res)=>{
    try{
        let productoModificado = req.body
        let modified = await ProductDao.updateProduct(req.params.pid,productoModificado)
        res.status(201).json(modified)
    }
    catch(err){
        res.status(500).json({error:err})
    }    
}

export const deleteProduct = async (req,res)=>{
    try{
        let deleted =await ProductDao.deleteProduct(req.params.pid)
        res.status(201).json(deleted.message)
    }
    catch(err){ res.status(500).json({error:err})}
    
}