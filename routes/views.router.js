import {Router} from 'express'
import ProductManager from '../classes/ProductManager.js'

let manager = new ProductManager('productos.json')
let productos = manager.getProducts()

const router = Router()

router.get('/',(req,res)=>{
 
    res.render('home',{productos})
})

router.get('/realtimeproducts',(req,res)=>{
 
    res.render('realtime')
})


export default router
