import Product from "../models/product.model.js";

export const getProducts=async(req,res)=>{
    try {
        const products=await Product.find({}).sort({createdAt:-1});
        res.status(200).json({products,success:true});
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}