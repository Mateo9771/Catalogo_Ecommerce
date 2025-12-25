// Backend/src/services/models/product.model.js
import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: {
        type: String,
        enum:['hombre', 'mujer'],
        required: true
    }
},{
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true }
});

productsSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

export default mongoose.model('Product', productsSchema);