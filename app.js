const http = require("http");

function rqListener(req, res) {
  console.log("req:", req);
  console.log("res:", res);
}

const server = http.createServer(rqListener);

server.listen(1000);
