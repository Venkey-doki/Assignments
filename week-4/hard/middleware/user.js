import JWT from "jsonwebtoken";

async function userMiddleware(req, res, next) {

	const JWTToken = req.headers["authorization"]?.split(" ")[1];

	try {
		const decoded = JWT.verify(JWTToken, process.env.JWT_SECRET);

		req.user = decoded;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			error: "Invalid User",
		});
	}
}

export default userMiddleware;