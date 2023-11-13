import express from 'express'
import ProductManager from '../ProductManager.js'

let manager = new ProductManager('productos.json')
let productos = manager.getProducts()
const app = express()
const port = 8080
app.use(express.urlencoded({extended:true}))

app.get('/products',(req,res)=>{


    const {limit} = req.query
    if(Number(limit)){
        res.json(productos.slice(0,limit))

    }
    else{
        res.json(productos)
    }
    
})

app.get('/products/:pid',(req,res)=>{

    const{ pid} =req.params
    let producto = manager.getProductById(pid)
    if(producto){
        res.json(producto)
    }
    else{
        res.send("PRODUCTO NO ENCONTRADO")
    }
    

})

app.listen(port,() => {
    console.log("Server listening in port: " + port)
})