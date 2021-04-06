import express from "express";
const router = express.Router();
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile); //add in protect middleware //chain request, can reference restful porject demo for more info

export default router;
