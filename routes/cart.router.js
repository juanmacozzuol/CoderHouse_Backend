import {Router} from 'express'
import CartManager from '../classes/CartManager.js'
import ProductManager from '../classes/ProductManager.js'
const router = Router()

const cartManager = new CartManager('carritos.json')
const carts = cartManager.getCarts()


router.post('/',(req,res)=>{
    res.send(cartManager.addCart())
})

router.get('/:cid',(req,res)=>{
    res.send(cartManager.getProducts(req.params.cid))    
})

router.post('/:cid/product/:pid',(req,res)=>{
   
    const {cid,pid} = req.params

    res.send(cartManager.addProductToCart(Number(cid),Number(pid)))
   
})


export default router