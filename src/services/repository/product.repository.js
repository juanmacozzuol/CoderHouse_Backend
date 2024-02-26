export default class ProductRepository{
    constructor(dao){
        this.dao = dao
    }

    getAllProducts = (limit, page, query, sort) =>{
        return this.dao.getAllProducts(limit, page, query, sort)
    }

    getProductById = (id) =>{
        return this.dao.getProductById(id)
    }

    createProduct = (product) =>{
        return this.dao.createProduct(product)
    }

    updateProduct = (id, product) =>{
        return this.dao.updateProduct(id, product)
    }

    deleteProduct = (id) =>{
        return this.dao.deleteProduct(id)
    }
}