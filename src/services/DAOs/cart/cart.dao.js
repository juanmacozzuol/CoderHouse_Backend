import {cartModel} from "../../../models/cart.model.js"

export default class CartDao {
    async getAllCarts(){
        return await cartModel.find()
    }

    async getCartById(id){
        return await cartModel.findById(id)
    }

    async createCart(){
        return await cartModel.create({})
    }

    async getProductsFromCart(id){
        return await cartModel.findById(id).populate('products.product')
    }

    async updateProducts(cid,cart){
        return await cartModel.findByIdAndUpdate(cid, cart)
    }



}

