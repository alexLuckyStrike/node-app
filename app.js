const http = require("http");
const routes = require("./routes");

function rqListener(req, res) {
  // console.log("req:", req);
  // const url = req.url;
  // const method = req.method;
}

const server = http.createServer(routes.handler);

server.listen(1000);
