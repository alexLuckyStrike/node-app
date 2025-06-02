const http = require("http");
const fs = require("fs");

function rqListener(req, res) {
  // console.log("req:", req);
  const url = req.url;
  const method = req.method;
  console.log("begin");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button>Send</button> </form></body>"
    );
    res.write("</html>");
    console.log("i am here /");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    // обрабатываем данные на сервеерной стороне
    // не дожидаясь окончания получения всех данных
    req.on("data", (chunk) => {
      console.log("chunk:", chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsedBody:", parsedBody);
      const message = parsedBody.split("=")[1];
      console.log("message:", message);
      fs.writeFileSync("message.txt", "Dummy");
    });

    fs.writeFileSync("message.text", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/message");
    console.log("i am here /message");
    return res.end();
  }

  // console.log("req:finish", req.url); запрос для фавиконки
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello!!!</h1></body>");
  res.write("</html>");
  res.end();
  // process.exit();
}

const server = http.createServer(rqListener);

server.listen(1000);
