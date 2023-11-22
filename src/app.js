import express from 'express'
import productRouter from '../routes/product.router.js'
import cartRouter from '../routes/cart.router.js'


const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)




app.listen(port,() => {
    console.log("Server listening in port: " + port)
})