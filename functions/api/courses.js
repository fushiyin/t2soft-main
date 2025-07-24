const express = require("express");
const { getAllCourses } = require("../services/courseService");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const courses = await getAllCourses();
		res.json(courses);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
