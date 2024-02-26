import {Schema, model} from 'mongoose'

const ticketSchema = new Schema({

    code: String,
    purchase_datetime: {type:Date, default: Date.now},
    amount: Number,
    purchaser: String,

})

const ticketModel = model('tickets',ticketSchema)

export {ticketModel}