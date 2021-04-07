import express from "express";
const router = express.Router();
import {
	authUser,
	getUsers,
	registerUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(protect, admin, getUsers);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile); //add in protect middleware //chain request, can reference restful porject demo for more info

export default router;
