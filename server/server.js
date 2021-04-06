// old style from native JS
// const express = require("express");
// const dotenv = require("dotenv");
//const products = require("./data/products"); //using native javaScript for product export
import express from "express";
import dotenv from "dotenv";
dotenv.config(); //place ".env file at root, not server folder"
import connectMongoDB from "./config/db.js";
import colors from "colors"; // Just... some colors for console output
// import products from "./data/products.js"; //initial use for mimicking data only
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const app = express();

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

//Now, using real routes
app.get("/", (req, res) => {
	res.send("Server API is runnning ... ");
});

//This handle the entry point for the api, productRoutes take cares the other
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//env config route for Paypal client ID
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

//Use error Handler middle from middleware/errorMiddleware.js
app.use(notFound);
app.use(errorHandler);

const serverPort = process.env.SERVER_PORT || 8000;

app.listen(serverPort, (req, res) => {
	console.log(
		`Server is Running with Mode -: [${process.env.NODE_ENV.inverse}] at port -: ${serverPort}`
			.green
	);
});
