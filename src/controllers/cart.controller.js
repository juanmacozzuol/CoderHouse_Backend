

import { productService,cartService, ticketService } from "../services/services.js"
import TicketDto from "../services/DTOs/ticket.dto.js"

export const getAllCarts = async (req,res)=>{
    try{
        res.send( await cartService.getAllCarts())
    }catch(err){
        res.status(500).json({error:err})
    }
}


export const getProductsFromCart = async (req,res)=>{
    try{
        let cart = await cartService.getProductsFromCart(req.params.cid)
        let products = cart.products
        res.send(products)
    }catch(err){
        res.status(500).json({error:err})
    }
        
}

export const createCart = async (req,res)=>{
    try{
        res.send( await cartService.createCart())
    }catch(err){
        res.status(500).json({error:err})
    }
    
}

export const addProductToCart = async (req,res)=>{

    try{
        if(req.session.user.rol === 'user'){
            const {cid,pid} = req.params
            const product = await  productService.getProductById(pid)
            const cart = await cartService.getCartById(cid)
            if (product == null || cart == null){
                return res.status(404).json("Producto Inexistente")
            }else{
            
                if(cart.products.some((e)=>e.product._id.toString() == product._id)){
                let index =cart.products.findIndex((e)=>e.product._id.toString() == product._id)
                cart.products[index].quantity +=1
                }
                else{   
                    cart.products.push({product:product._id})
            
                }
                const addedProduct = cartService.updateProducts(cart._id,cart)
                res.status(200).json(addedProduct)
            }
        }
        else{
            res.status(401).json({message:"Acceso denegado"})
        }
      
    }catch(err){
        res.status(500).json({error:err})
        
    }
}

export const addBatchProducts = async (req,res)=>{
    if(req.session.user.rol === 'user'){
        let cart = await cartService.getCartById(req.params.cid)
        let products = req.body
        products.forEach((e)=>{
            if(cart.products.findIndex((p)=>p.product._id.toString() == e._id) != -1){
                cart.products[cart.products.findIndex((p)=>p.product._id.toString() == e._id)]. quantity += e.quantity
            }else{
                cart.products.push({product:e._id,quantity:e.quantity})
            }
        
        })
        const addedProduct = cartService.updateProducts(cart._id,cart)
        res.status(200).json(addedProduct)
    }
    else{
        res.status(401).json({message:"Acceso denegado"})
    }

}


export const modifyQuantity = async (req,res)=>{
    let cart = await cartService.getCartById(req.params.cid)
    const product = await  productService.getProductById(req.params.pid)
    if(cart.products.some((e)=>e.product._id.toString() == product._id)){
        let index =cart.products.findIndex((e)=>e.product._id.toString() == product._id)
        cart.products[index].quantity = req.body.quantity
        const addedProduct = cartService.updateProducts(cart._id,cart)
            res.status(200).json(addedProduct)
     }
    
}

export const deleteProductFromCart = async (req,res)=>{
    try{
        let cart = await cartService.getCartById(req.params.cid)
       
        let newProducts = cart.products.filter((e)=> e.product._id.toString() != req.params.pid)
        console.log(newProducts)
        cart.products= newProducts
        let updatedCart = cartService.updateProducts(req.params.cid,cart)
        res.status(201).json(updatedCart)
    }
    catch(err){ res.status(500).json({error:err})}
    
}

export const emptyCart = async (req,res)=>{
    try{
        let deleted = await cartService.getCartById(req.params.cid)
        deleted.products = []
        let updatedCart = cartService.updateProducts(req.params.cid,deleted)
        res.status(201).json(deleted.message)
    }
    catch(err){ res.status(500).json({error:err})}
    
}

export const finishPurchase = async (req,res) =>{
        console.log(req.params.cid)
        let cart = await cartService.getCartById(req.params.cid)
        let total_price = 0;
        let unstocked_products = []
        console.log(cart.products)
        for( const item of cart.products){
            let product = await productService.getProductById(item.product)
            if(product.stock >= item.quantity){

                total_price += item.quantity * product.price
                let stockLoweing = await productService.updateProduct(item.product,{stock:product.stock - item.quantity})
                
            }
            else{
                unstocked_products.push({product:product._id,quantity:item.quantity})
            }
            

        }

        if(total_price > 0){

        cart.products = unstocked_products
        let newCart = await cartService.updateProducts(req.params.cid,cart)
        let newTicket = await ticketService.createTicket({code:`${req.params.cid}_${Date.now()}`,amount:total_price,purchaser:req.session.user.email})
        return res.status(200).json(new TicketDto(newTicket))
        } 
        else{
            return res.status(404).json({message:"No se realizó ninguna compra"})
        }
}