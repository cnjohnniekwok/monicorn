import express from "express";
const router = express.Router();
import {
	authUser,
	getUsers,
	getUserById,
	registerUser,
	deleteUser,
	getUserProfile,
	updateUserProfile,
	updateUserByAdmin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(protect, admin, getUsers);

router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile); //add in protect middleware //chain request, can reference restful porject demo for more info

//("/:id") need to comes after the ("/profile"), otherwise server will treat "profile" as an ID...
router
	.route("/:id")
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUserByAdmin);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
