import mongoose from 'mongoose'

const collection = 'users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name : String,
    email:{
        type:String,
        unique:true
    },
    age: Number,
    password:String,
    rol: String,
    cart: {type: mongoose.Schema.Types.ObjectId}
})

const userModel = mongoose.model(collection, userSchema)

export default userModel