import express from 'express'
import productRouter from '../routes/product.router.js'
import cartRouter from '../routes/cart.router.js'
import viewsRouter from '../routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from '../utils.js'
import {Server} from 'socket.io'
import ProductManager from '../classes/ProductManager.js'

const app = express()
const port = 8080

const httpServer =  app.listen(port,() => {
    console.log("Server listening in port: " + port)
})

const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/',viewsRouter)

const manager = new ProductManager("productos.json")
const productos = manager.getProducts()

socketServer.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
    socketClient.emit('product_list', productos)
    socketClient.on('product', (product)=>{
        console.log(product)
        productos.push(product)
        socketClient.emit('product_list', productos)
    })
})
