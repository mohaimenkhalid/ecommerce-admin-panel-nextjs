import mongoose, {model, models, Schema} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: [true, "skjfhkajhfawf"]
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        set: v => v === "" ? null : v
    }
})

export const Category = models.Category || model('Category', categorySchema)