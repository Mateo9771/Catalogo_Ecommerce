import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true},
    items:[{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        titulo: String,
        precio: Number,
        quantity: Number,
        imagenUrl: String
    }],
    total: Number,
    customerMessage: String,
    status: {
        type: String,
        enum:['pendiente', 'pagado', 'enviado', 'completado', 'cancelado', 'rechazado'],
        default: 'pendiente'
    },
    createdAt: { type: Date, default: Date.now },
    confirmedAt: Date,
    notes: String
},{
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true }
});

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderSchema.pre('save', async function(next) {
    if (!this.orderId) {
        const year = new Date().getFullYear();
        const count = await this.constructor.countDocuments({
            orderId:{ $regex: `^PED-${year}-` }
        });
        this.orderId = `PED-${year}-${String(count + 1).padStart(4, '0')}`;
    }
    next();
});

export default mongoose.model('Order', orderSchema);