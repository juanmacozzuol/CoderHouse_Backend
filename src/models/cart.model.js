import { Schema, model, mongoose} from 'mongoose'

const cartSchema = new Schema({
  
products:{
    type:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:{type:Number, default: 1}
        }
    ]
}

});

const cartModel = model('carts', cartSchema)

export { cartModel };