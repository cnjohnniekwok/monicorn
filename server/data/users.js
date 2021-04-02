import bcrypt from "bcryptjs";
//Just some fake users for development purpose
const users = [
	{
		name: "MoCo Admin User",
		email: "admin@moco.com",
		password: bcrypt.hashSync("admin", 10),
		isAdmin: true,
	},
	{
		name: "Momo",
		email: "momo@moco.com",
		password: bcrypt.hashSync("12345", 10),
	},
	{
		name: "Fafa",
		email: "fafa@moco.com",
		password: bcrypt.hashSync("12345", 10),
	},
];

export default users;
