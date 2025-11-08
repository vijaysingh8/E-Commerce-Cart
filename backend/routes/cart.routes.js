import express from "express";
import { addToCart, deleteFromCart, getCart } from "../controllers/cart.controllers.js";

const router=express.Router();
router.post("/add",addToCart);
router.get("/get",getCart);
router.delete("/delete/:productId", deleteFromCart);

export default router;