import mongoose from "mongoose";
import colors from "colors";

//async will get a promise when we deal with Mongo DB
const connectMongoDB = async () => {
	try {
		const mongoAtlasURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@cluster0.gugxn.mongodb.net/${process.env.DB_NAME}`;
		const mongoConn = await mongoose.connect(mongoAtlasURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreatendex: true,
		});

		console.log(
			`MongoDB Connected -: ${mongoConn.connection.host}`.cyan.underline
		);
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline);
		process.exit(1);
	}
};

export default connectMongoDB;
