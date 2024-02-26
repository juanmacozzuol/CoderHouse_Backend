import {faker} from '@faker-js/faker'

export const generateProduct = () =>{
    return{
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric({casing:"lower", length:{min:5, max:5}}),
        price: faker.commerce.price({min:1,max:1000000,dec:0}),
        stock: faker.number.int(5000),
        category:faker.commerce.department(),
        status: true,
        thumbnails: [faker.image.url]
    }
}

