const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// 🛡️ Allow cross-origin requests from any origin
app.use(cors({ origin: true }));
app.use(express.json());

const coursesRouter = require("./api/courses");
const youtubeRouter = require("./api/youtube");
const documentsRouter = require("./api/documents");
const blogRoutes = require("./api/blog");

app.use("/courses", coursesRouter);
app.use("/youtube", youtubeRouter);
app.use("/documents", documentsRouter);
app.use("/posts", blogRoutes);

exports.api = functions.https.onRequest(app);
