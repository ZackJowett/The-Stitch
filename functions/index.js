const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("*", (req, res) => {
	res.send("<h1>Hello World!</h1>");
});

exports.app = functions.https.onRequest(app);
