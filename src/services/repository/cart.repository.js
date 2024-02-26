export default class CartRepository{
    constructor(dao){
        this.dao = dao
    }

    getAllCarts = () =>{
        return this.dao.getAllCarts()
    }

    getCartById = (id) =>{
        return this.dao.getCartById(id)
    }

    createCart = () =>{
        return this.dao.createCart()
    }

    getProductsFromCart = (id) =>{
        return this.dao.getProductsFromCart(id)
    }

    updateProducts = (cid,cart) =>{
        return this.dao.updateProducts(cid, cart)
    }
}