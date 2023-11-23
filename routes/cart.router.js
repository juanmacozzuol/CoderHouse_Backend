import {Router} from 'express'
import CartManager from '../classes/CartManager.js'
import ProductManager from '../classes/ProductManager.js'
const router = Router()

const cartManager = new CartManager('carritos.json')
const carts = cartManager.getCarts()
const manager = new ProductManager('productos.json')
const products = manager.getProducts()

router.post('/',async (req,res)=>{
    try{
        res.send( await cartManager.addCart())
    }catch(err){
        res.status(500).json({error:err})
    }
    
})

router.get('/:cid',(req,res)=>{
    try{
        res.send(cartManager.getProducts(req.params.cid))
    }catch(err){
        res.status(500).json({error:err})
    }
        
})

router.post('/:cid/product/:pid', async (req,res)=>{

    try{
        const {cid,pid} = req.params
        const checkProduct = manager.getProductById(Number(pid))
        if (checkProduct === 'Not found'){
          return  res.status(404).json({error:"Producto no presente en la base de datos"})
        }
        let addedProduct = await cartManager.addProductToCart(Number(cid),Number(pid))
        if(addedProduct?.error){
           return res.status(404).json(addedProduct.error)
        }    
            res.status(200).json(addedProduct)
    }catch(err){
        res.status(500).json({error:err})
        
    }
})


export default router