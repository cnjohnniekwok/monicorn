import express from "express";
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getAllOrders,
	deleteOrderById,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
	.route("/")
	.post(protect, addOrderItems)
	.get(protect, admin, getAllOrders); //Not Calling it! just passing the controllers in
router.route("/myorders").get(protect, getMyOrders);
router
	.route("/:id")
	.get(protect, getOrderById)
	.delete(protect, deleteOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid); //updating the order as paid.
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered); //updating the order as delivered.

export default router;
