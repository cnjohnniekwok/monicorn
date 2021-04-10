import Product from "../models/productModel.js";
//Handle async error for async call functions
import asyncHandler from "express-async-handler";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	//for paging
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1; //?pageNumber

	//for search bar
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {}; //if no query string, just use empty object as if search for all.

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);
	//get product by params ID from DB
	if (product) {
		//check if user already submit review.
		const alreadyReviewd = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewd) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}

	const updateProduct = await product.save();
	res.status(201).json(updateProduct);
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);
	res.json(products);
});

export {
	getProducts,
	getProductByID,
	deleteProductByID,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
