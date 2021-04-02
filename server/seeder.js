// just create this to import fake users, product to MongoDB.
// DB and Console
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
// Fake data
import users from "./data/users.js";
import products from "./data/products.js";
// Database models for importing fake data
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectMongoDB from "./config/db.js";

dotenv.config();
connectMongoDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		const createUsers = await User.insertMany(users);
		const adminUser = createUsers[0]._id; //get the Admin ID
		//simulate Admin User adding all the product using the admin's credential and Id
		const sampleProducts = products.map((product) => {
			// ...product get everything in product.js array, just map adminUser to all user field for each product in the array
			return { ...product, user: adminUser };
		});

		//finally import the adminUsers IDed product list into MongDB
		await Product.insertMany(sampleProducts);
		console.log("Date Imported".green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

// remove everything from Mongo DB
const destoryData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		console.log("Date Destroyed".red.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

//make it command line frinedly, add npm script short cut to package.json data:import and data:destroy
if (process.argv[2] === "-d") {
	destoryData();
} else {
	importData();
}
