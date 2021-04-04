import jwt from "jsonwebtoken";

//takes in an id as returning payload for JWT
const generatToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d", // expire in 30 day
	});
};

export default generatToken;
