const { db } = require("../utils/firebaseAdmin");

async function getAllCourses() {
	const snapshot = await db.collection("courses").get();
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

module.exports = { getAllCourses };
