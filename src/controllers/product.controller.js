import { productService } from "../services/services.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";

export const getAllProducts = async (req,res)=>{
    try{
        const { limit,page,query,sort } = req.query
        const productos = await productService.getAllProducts(limit, page, query, sort);
        
   
   
            res.json(productos)
        
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

export const getProduct = async (req,res)=>{
    try{
        
        const{ pid } = req.params
        const producto = productService.getProductById(pid)
        res.json(producto)

    }
    catch(err){
        res.status(500).json({error:err})
    }

    

}

export const createProduct = async (req,res)=>{
    try{
       
            
        let producto = req.body

        if(!producto.title||!producto.description||!producto.code||!producto.price||!producto.stock||!producto.category){
            CustomError.createError({
                name:"Product creation error",
                cause: generateProductErrorInfo(producto),
                message:"Error trying to create product",
                code:EErrors.INVALID_TYPES_ERROR
            })
        }
        const newProduct = await productService.createProduct(producto)
        res.status(201).json({message: "Producto agregado correctamente"})
        
     
    }
    catch(error){
        console.error(error.cause);
        res.status(500).send({ error: error.code, message: error.message });
    }

}

export const updateProduct = async (req,res)=>{
    try{
        if(req.session.user.rol === 'admin'){
            let productoModificado = req.body
            let modified = await productService.updateProduct(req.params.pid,productoModificado)
            res.status(201).json(modified)
        }
        else{
            res.status(401).json({message:"Acceso denegado"})
        }
    }
    catch(err){
        res.status(500).json({error:err})
    }    
}

export const deleteProduct = async (req,res)=>{
    try{
        if(req.session.user.rol === 'admin'){
            let deleted =await productService.deleteProduct(req.params.pid)
            res.status(201).json(deleted.message)
        }
        else{
            res.status(401).json({message:"Acceso denegado"})
        }
    }
    catch(err){ res.status(500).json({error:err})}
    
}



