export const generateProductErrorInfo = (product) =>{
    return `One or more properties were incomplete or invalid.
    List of required properties:
    *title: needs to be a String, received ${product.title}
    *description: needs to be a String, received ${product.description}
    *code: needs to be a String, received ${product.code}
    *price: needs to be a Number, received ${product.price}
    *stock: needs to be a Number, received ${product.stock}
    *category: needs to be a String, received ${product.category}`
}