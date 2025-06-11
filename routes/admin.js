const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("In the first middleware");
  res.send(
    "<form action='/product' method='post'><input type='text' name='title'><button type='submit'>press</button></form>"
  );
});

router.post("/product", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
