import express from "express";
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems); //Not Calling it! just passing the controllers in
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid); //updating the order as paid.

export default router;
