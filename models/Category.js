import mongoose, {model, models, Schema} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    parent: {
        type: mongoose.Types.ObjectId
    }
})

export const Category = models.Category || model('Category', categorySchema)