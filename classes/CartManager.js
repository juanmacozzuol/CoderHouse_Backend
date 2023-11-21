import fs from 'fs'

class CartManager {

    constructor(path){
        this.path = path
        this.carts = []
        
    }

    getCarts(){
        if(!this.carts.length){
            this.carts =  JSON.parse( fs.readFileSync(this.path))
        }
        return this.carts
    }

    addCart(){
        console.log(this.path)
        let cart = new Cart()
        if(this.carts.length== 0){
            cart.id = 1;
        }
        else{
            cart.id = this.carts[this.carts.length-1].id +1
        }
        
        this.carts.push(cart)
        fs.writeFileSync(this.path,JSON.stringify(this.carts))
        return cart

    }

    getProducts(id){
        let cart = this.carts.find(element =>element.id == id)
        console.log(cart)
        return cart.products

    }

    addProductToCart(cartId,productId){
        
        let cart_to_modify = this.carts[this.carts.findIndex(element => element.id == cartId)]
        if(!cart_to_modify){
            return "carrito inexistente"
        }
        if(!cart_to_modify.products.find(element => element.product== productId)){
            cart_to_modify.products.push({"product":productId, "quantity":1})
        }
        else{
            cart_to_modify.products[cart_to_modify.products.findIndex(element => element.product == productId)].quantity +=1
        }
        this.carts[this.carts.findIndex(element => element.id == cartId)] = cart_to_modify
        fs.writeFileSync(this.path,JSON.stringify(this.carts))
        return this.carts[this.carts.findIndex(element => element.id == cartId)]

    }

}


class Cart {
    constructor(){
        this.products = []
    }
}

export default CartManager