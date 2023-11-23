import express from 'express'
import productRouter from '../routes/product.router.js'
import cartRouter from '../routes/cart.router.js'
import viewsRouter from '../routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from '../utils.js'

const app = express()
const port = 8080

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/',viewsRouter)




app.listen(port,() => {
    console.log("Server listening in port: " + port)
})