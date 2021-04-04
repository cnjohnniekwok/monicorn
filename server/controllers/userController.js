import User from "../models/userModel.js";
//Handle async error for async call functions
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & Get Token
// @route GET /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//look for the incoming user from DB:
	const user = await User.findOne({ email: email });

	//check if the user password matches db's record
	if (user && (await user.matchPassword(password))) {
		//if matched, return JSON with User info and generate token
		res.json({
			_id: user._id,
			name: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user._id), // this takes in an userID
		});
	} else {
		res.status(401); //unauthorized
		throw new Error("Invalid email or password.");
	}
});

// @desc Register a new user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	//look for the incoming user from DB:
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// create the user using mongoose user model
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		//status 201 = something is created
		res.status(201).json({
			_id: user._id,
			name: user.name,
			isAdmin: user.isAdmin,
			//Takes the new generated token to authenticate user right after login
			token: generateToken(user._id), // this takes in an userID});
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Info.");
	}
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export { authUser, getUserProfile, registerUser };
