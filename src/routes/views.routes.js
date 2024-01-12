import {Router} from 'express'
import ProductDao from '../daos/dbManager/product.dao.js'
import CartDao from '../daos/dbManager/cart.dao.js'
const router = Router()

router.get('/',async (req,res)=>{
    const { limit,page,query,sort } = req.query
    const productos = await ProductDao.getAllProducts(limit, page, query, sort);
    
    res.render("products",{productos, user:req.session.user})
})

router.get('/carts/:cid',async (req,res)=>{
    const {cid} = req.params
    const productos = await CartDao.getProductsFromCart(cid)
    console.log(productos)
    res.render("cart",{productos})
})
export default router

