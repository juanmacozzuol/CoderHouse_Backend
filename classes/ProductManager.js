import fs from 'fs'

class ProductManager {
    constructor(path){
        this.products = []
        this.path = path
    }

    addProduct(producto){
        let {title, description, code, price, status, stock, category, thumbnails} = producto
    
        if(!title || !description || !price || !code  || !stock || !category){
            console.log("producto incompleto, no se registrará")
            return "producto incompleto, no se registrará"
        } 
        if(status == undefined){
            producto.status = true
        }

        const repetido = this.products.find((element) => element.code == producto.code)

        if(repetido != undefined){
            console.log("producto con codigo ya agregado")
            return "producto con codigo ya agregado"


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
            return producto

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
            return "codigo ya existente en otro producto, no se actualizará la información"
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
                return this.products[indicePorID]

            }
        }

    }

    deleteProduct(id){
        let indicePorID = this.products.findIndex((element) => element.id == id)
        if(indicePorID != -1){
        
            this.products.splice(indicePorID, 1)
            fs.writeFileSync(this.path,JSON.stringify(this.products))
            return "Producto Eliminado."
        }
        else{
            return "Not Found"
        }
    }
}


export default ProductManager