const express = require("express");
const router = express.Router();
//get
router.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

module.exports = router;
