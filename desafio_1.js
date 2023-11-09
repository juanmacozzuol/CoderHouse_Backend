class ProductManager {
    constructor(){
        this.products = []
    }
    addProduct(producto){
        if(producto.title == undefined || producto.description == undefined || producto.price == undefined || producto.thumbnail == undefined || producto.code == undefined || producto.stock == undefined){
           return console.log("producto incompleto, no se registrará")
        } 
        const repetido = this.products.find((element) => element.code == producto.code)
        if(repetido != undefined){
            return console.log("producto con codigo ya agregado")

        }
        else{
            producto.id = this.products.length +1 
            this.products.push(producto)
        }
    }
    getProducts(){
        return this.products
    }

    getProductById(id){
        let porId = this.products.find((element) => element.id == id)
        
        if(porId == undefined){
           return console.log("Not found")
        }
        else{
            return porId
        }
        
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

let manager = new ProductManager()

let producto1 = new Product("producto prueba", "este producto es una prueba", 200, "sin imagen", "abc123", 25)
let producto2 = new Product("producto prueba2", "este producto es una prueba2", 500, "sin imagen2", "abc12", 45)
manager.addProduct(producto1)
console.log(manager.getProducts())
manager.getProductById(2)
manager.addProduct(producto2)
console.log(manager.getProducts())
console.log(manager.getProductById(2))