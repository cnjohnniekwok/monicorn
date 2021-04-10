import express from "express";
const router = express.Router();
import {
	getProducts,
	createProduct,
	updateProduct,
	getProductByID,
	deleteProductByID,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
	.route("/:id")
	.get(getProductByID)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProductByID);
router.route("/").get(getProducts).post(protect, admin, createProduct); //Not Calling it! just passing the controllers in

export default router;
