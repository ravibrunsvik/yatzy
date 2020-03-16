const express = require("express");
const app = express();
const path = require("path");

// view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware
app.use(express.static(__dirname + "/public"));

// routes
const indexRouter = require(path.join(__dirname, "/routes/index"));
app.use("/", indexRouter);
// Fire up server
app.listen(3000);

console.log("Connected at 3000!");
module.exports = app;
