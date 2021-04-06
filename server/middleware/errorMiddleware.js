// app.use((req, res, next) => {
// 	console.log("Hello");
// 	next(); //Move to the next middleware
// });

//handle 404 api not found
const notFound = (req, res, next) => {
	const error = new Error(`Not Found x_x - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

//overriding the error function handler.
const errorHandler = (err, req, res, next) => {
	//if status code is 200, make it 500, otherwise just pass the status code as it is.
	const statusCode = res.statusCode == 200 ? 500 : res.statusCode;

	res.status(statusCode);
	res.json({
		message: err.message,
		//if the server runs in proudction mode (controlled in .env NODE_ENV var), leave it, otherwise, send the stack as well.
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { notFound, errorHandler };
