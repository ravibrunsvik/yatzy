const express = require("express");
const app = express();

// Static files
app.use(express.static(__dirname + "/client"));

// routes
const indexRouter = require(__dirname + "/routes/index");
app.use("/", indexRouter);
// Fire server
app.listen(3000);

console.log("Connected at 3000!");
module.exports = app;
