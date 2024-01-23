import {productModel} from "../../models/product.model.js"

class ProductDao {
    async getAllProducts(limit = 10 , page = 1, query, sort ){
        let consulta = {}
        if (query != undefined){
            consulta[query.split(":")[0]] = query.split(":")[1]
        }
        return await productModel.paginate(consulta,{limit:limit,page:page,sort:sort == undefined ? {}: {price:Number(sort)}})
            
    }

    async getProductById(id){
        return await productModel.findById(id)
    }

    async createProduct(product){
        return await productModel.create(product)
    }

    async updateProduct(id,product){
        return await productModel.findByIdAndUpdate(id,product)
    }

    async deleteProduct(id){
        return await productModel.findByIdAndDelete(id)
    }
}

export default new ProductDao();
