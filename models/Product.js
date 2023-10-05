import {model, Schema, models} from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: String,
})

export const Product =
    models.Product || model('Product', productSchema)