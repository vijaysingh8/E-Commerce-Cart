import Receipt from "../models/receipt.model.js";

export const saveReceipt=async(req,res)=>{
    try {
         const { name, email, cartItems } = req.body;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const receipt = await Receipt.create({
        name,
        email,
        items: cartItems,
        total
    });

    return res.json({
        message: "Checkout successful",
        receipt
    });
        
    } catch (error) {
         res.status(500).json({message:"Server error",error:error.message});
    }
    
}