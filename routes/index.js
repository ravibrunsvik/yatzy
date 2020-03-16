const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/yatzy", (req, res) => {
  res.render("index");
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
