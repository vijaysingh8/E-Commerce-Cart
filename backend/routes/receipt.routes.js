import express from 'express';
import { saveReceipt } from '../controllers/receipt.controllers.js';
const router=express.Router();
router.post("/",saveReceipt);
export default router;