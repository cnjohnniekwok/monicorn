import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			//vaildate the req header token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			//console.log(decoded); //reads decoded infomations

			//return users info but not the password
			req.user = await User.findById(decoded.id).select("-password");

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not Authorized, Invaild Token");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not Authorized, No token");
	}
});

export { protect };
