const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log("In the another middleware");
  res.send("<h1>express</h1>");
});

app.use(shopRoutes);
app.use(adminRoutes);
app.listen(1000);
