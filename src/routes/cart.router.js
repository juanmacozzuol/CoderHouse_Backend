import {Router} from 'express'
import CartDao from '../daos/dbManager/cart.dao.js'
import productDao from '../daos/dbManager/product.dao.js'
import cartDao from '../daos/dbManager/cart.dao.js'
const router = Router()


router.get('/',async (req,res)=>{
    try{
        res.send( await CartDao.getAllCarts())
    }catch(err){
        res.status(500).json({error:err})
    }
        
})

router.get('/:cid',async (req,res)=>{
    try{
        let cart = await CartDao.getProductsFromCart(req.params.cid)
        let products = cart.products
        res.send(products)
    }catch(err){
        res.status(500).json({error:err})
    }
        
})

router.post('/',async (req,res)=>{
    try{
        res.send( await CartDao.createCart())
    }catch(err){
        res.status(500).json({error:err})
    }
    
})



router.post('/:cid/product/:pid', async (req,res)=>{

    try{
        const {cid,pid} = req.params
        const product = await  productDao.getProductById(pid)
        const cart = await cartDao.getCartById(cid)
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
            const addedProduct = cartDao.updateProducts(cart._id,cart)
            res.status(200).json(addedProduct)
        }
      
    }catch(err){
        res.status(500).json({error:err})
        
    }
})

router.put('/:cid', async (req,res)=>{
    let cart = await CartDao.getCartById(req.params.cid)
    let products = req.body
    products.forEach((e)=>{
        if(cart.products.findIndex((p)=>p.product._id.toString() == e._id) != -1){
            cart.products[cart.products.findIndex((p)=>p.product._id.toString() == e._id)]. quantity += e.quantity
        }else{
            cart.products.push({product:e._id,quantity:e.quantity})
        }
       
    })
    const addedProduct = cartDao.updateProducts(cart._id,cart)
    res.status(200).json(addedProduct)

})

router.put('/:cid/product/:pid', async (req,res)=>{
    let cart = await CartDao.getCartById(req.params.cid)
    const product = await  productDao.getProductById(req.params.pid)
    if(cart.products.some((e)=>e.product._id.toString() == product._id)){
        let index =cart.products.findIndex((e)=>e.product._id.toString() == product._id)
        cart.products[index].quantity = req.body.quantity
        const addedProduct = cartDao.updateProducts(cart._id,cart)
            res.status(200).json(addedProduct)
     }
    
})

router.delete('/:cid/product/:pid', async (req,res)=>{
    try{
        let cart = await CartDao.getCartById(req.params.cid)
       
        let newProducts = cart.products.filter((e)=> e.product._id.toString() != req.params.pid)
        console.log(newProducts)
        cart.products= newProducts
        let updatedCart = CartDao.updateProducts(req.params.cid,cart)
        res.status(201).json(updatedCart)
    }
    catch(err){ res.status(500).json({error:err})}
    
})

router.delete('/:cid', async (req,res)=>{
    try{
        let deleted = await CartDao.getCartById(req.params.cid)
        deleted.products = []
        let updatedCart = CartDao.updateProducts(req.params.cid,deleted)
        res.status(201).json(deleted.message)
    }
    catch(err){ res.status(500).json({error:err})}
    
})


export default router