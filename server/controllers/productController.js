import Product from "../models/productModel.js";
//Handle async error for async call functions
import asyncHandler from "express-async-handler";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductByID = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		// res.status(404).json({ message: "Product not found" }); //default error handling
		//custom errorHandler: errorMiddleware
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc delete single product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProductByID = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc Create single product
// @route POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample Name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample Brand",
		category: "Sample category",
		countInStock: 0,
		numReviews: 0,
		description: "Sample description",
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc Create single product
// @route PUT /api/products/
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);
	//get product by params ID from DB
	if (product) {
		//Update with body
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
	} else {
		res.status(404);
		throw new Error("Product not found");
	}

	const updateProduct = await product.save();
	res.status(201).json(updateProduct);
});

export {
	getProducts,
	getProductByID,
	deleteProductByID,
	createProduct,
	updateProduct,
};
