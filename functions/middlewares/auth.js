const { auth } = require("../utils/firebaseAdmin");

async function authenticate(req, res, next) {
	const token = req.headers.authorization && req.headers.authorization.split("Bearer ")[1];
	if (!token) return res.status(401).json({ error: "No token provided" });

	try {
		const decoded = await auth.verifyIdToken(token);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
}

module.exports = authenticate;
