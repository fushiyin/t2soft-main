const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const coursesRouter = require("./api/courses");
const youtubeRouter = require("./api/youtube");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/youtube", youtubeRouter);

exports.api = functions.https.onRequest(app);
