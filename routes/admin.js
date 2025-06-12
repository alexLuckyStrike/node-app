const path = require("path");

const express = require("express");

const rootDir = require("../utils/path.js");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("In the first middleware");

  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
