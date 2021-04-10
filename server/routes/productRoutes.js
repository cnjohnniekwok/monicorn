import express from "express";
const router = express.Router();
import {
	getProducts,
	createProduct,
	updateProduct,
	getProductByID,
	deleteProductByID,
	createProductReview,
	getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/top", getTopProducts);
router
	.route("/:id")
	.get(getProductByID)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProductByID);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/").get(getProducts).post(protect, admin, createProduct); //Not Calling it! just passing the controllers in

export default router;
