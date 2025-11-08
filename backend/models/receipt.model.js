import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
    name: String,
    email: String,
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            qty: Number,
            price: Number
        }
    ],
    total: Number,
    createdAt: { type: Date, default: Date.now }
});
const Receipt=mongoose.model("Receipt", receiptSchema);
export default Receipt;