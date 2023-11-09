import fs from 'fs'

class ProductManager {
    constructor(path){
        this.products = []
        this.path = path
    }
    addProduct(producto){
        let {title, description, price, thumbnail, code, stock} = producto
        if(!title || !description || !price  || !thumbnail || !code  || !stock){
           return console.log("producto incompleto, no se registrará")
        } 

        const repetido = this.products.find((element) => element.code == producto.code)
        if(repetido != undefined){
            return console.log("producto con codigo ya agregado")

        }
        else{
            if(this.products.length == 0){
                producto.id = 1
            }
            else{
                producto.id = this.products[this.products.length-1].id +1 
            }
            
            this.products.push(producto)
            fs.writeFileSync(this.path,JSON.stringify(this.products))

        }
    }
    getProducts(){
        if(!this.products.length){
            this.products =  JSON.parse( fs.readFileSync(this.path))
        }
        return this.products
    }

    getProductById(id){
       
        let porId = this.products.find((element) => element.id == id)
        
        if(porId == undefined){
           return "Not found"
        }
        else{
            return porId
        }
        
    }

    updateProduct(id,updateInfo){
        
       
        if(this.products.find((element)=>element.code == updateInfo.code) !=undefined){
            return console.log("codigo ya existente en otro producto, no se actualizará la información")
        }
        else{
            let elementoPorId = this.products.find((element) => element.id == id)
            

            if(elementoPorId == undefined){
                return "Not found"
            }
            else{
                let indicePorID = this.products.findIndex((element) => element.id == id)

                this.products[indicePorID] = {...elementoPorId,...updateInfo}
                fs.writeFileSync(this.path,JSON.stringify(this.products))

            }
        }

    }

    deleteProduct(id){
      
        this.products.splice(id-1, 1)
        fs.writeFileSync(this.path,JSON.stringify(this.products))

    }
}

class Product{
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}


export default ProductManager