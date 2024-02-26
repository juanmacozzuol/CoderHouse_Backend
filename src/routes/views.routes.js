import {Router} from 'express'
import { productService, cartService } from '../services/services.js'
import { generateProduct } from "../utils/mock.js"

const router = Router()

router.get('/',async (req,res)=>{
    const { limit,page,query,sort } = req.query
    const productos = await productService.getAllProducts(limit, page, query, sort);

    res.render("products",{productos, user:req.session.user})
})

router.get('/carts/:cid',async (req,res)=>{
    const {cid} = req.params
    const productos = await cartService.getProductsFromCart(cid)
    console.log(productos)
    res.render("cart",{productos})
})

router.get('/chat',(req,res)=>{
    if(req.session.user.rol === 'user'){
    res.render('chat',{})
    }
    else{
        res.render('denied')
    }
})

router.get('/mockingproducts',  async (req,res)=>{
    let products = []
    for (let i =0; i<100;i++){
        products.push(generateProduct())

    }
    res.send({status:"success", payload: products})
 
    

})


export default router

