const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

// (req, res, next) => {
//   res.status(404).send("<h1>Page out</h1>");
// }

app.use(errorRoutes);

app.listen(1000);
