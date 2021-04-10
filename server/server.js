// old style from native JS
// const express = require("express");
// const dotenv = require("dotenv");
//const products = require("./data/products"); //using native javaScript for product export
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadroutes from "./routes/uploadRoutes.js";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors"; // Just... some colors for console output
// import products from "./data/products.js"; //initial use for mimicking data only
dotenv.config(); //place ".env file at root, not server folder"

const app = express();
const __dirname = path.resolve();

//allow to accept JSON data from req.body
app.use(express.json());

//connect to MongoDB import from config/db.js
connectMongoDB();

// //just mimicking an api call return data from sever for now..
// app.get("/api/products", (req, res) => {
// 	res.json(products);
// });

// //just mimicking an api call return data from sever for now..
// app.get("/api/products/:id", (req, res) => {
// 	const product = products.find((product) => {
// 		if (req.params.id === product._id) {
// 			res.json(product);
// 		}
// 	});
// });

//This handle the entry point for the api, productRoutes take cares the other
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadroutes);

//env config route for Paypal client ID
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

//Make static folder path to build file for heroku deployment
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));

	//any route that is not any of the route defined up above, will point to the static folder's index.html
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
} else {
	//if dev mode:
	app.get("/", (req, res) => {
		res.send("Server API is runnning ... ");
	});

	app.use(morgan("dev"));
}

//make upload folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Use error Handler middle from middleware/errorMiddleware.js
app.use(notFound);
app.use(errorHandler);

const serverPort = process.env.PORT || 8000;

app.listen(serverPort, (req, res) => {
	console.log(
		`Server is Running with Mode -: [${process.env.NODE_ENV.inverse}] at port -: ${serverPort}`
			.green
	);
});
