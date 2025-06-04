const http = require("http");
const fs = require("fs");

function rqListener(req, res) {
  // console.log("req:", req);
  const url = req.url;
  const method = req.method;
  console.log("begin rqListener");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button>Send</button> </form></body>"
    );
    res.write("</html>");
    console.log("i am here / стартовая страница при загрузке");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    // обрабатываем данные на сервеерной стороне
    // не дожидаясь окончания получения всех данных
    console.log("страница /message");
    req.on("data", (chunk) => {
      console.log("chunk: eventListener data", chunk);
      body.push(chunk);
    });
    //  посмотреть когда выполняется код data end
    // return для того чтобы не дать выполнится коду res.setHeader("Content-Type", "text/html");
    // так как заголовки уже установлены res.setHeader("Location", "/message");
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsedBody:eventListenet", parsedBody);
      //console.log("eventListenet")
      const message = parsedBody.split("=")[1];
      // console.log("message:", message);
      fs.writeFile("message.txt", message, (err) => {
        console.log("err:", err);
        //fs.writeFileSync("message.text", "DUMMY");
        // падает с ошибкой headers если не поставить return перед end
        // это происходит так как нельзя устанавливать заголовки дважды
        res.statusCode = 302;
        res.setHeader("Location", "/");
        //  console.log("i am here /message");
        //return
        // return
        return res.end();
      });
    });
  }

  // console.log("req:finish", req.url); запрос для фавиконки
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello!!!</h1></body>");
  res.write("</html>");
  res.end();
  // process.exit();
  console.log("finish rqListener");
}

const server = http.createServer(rqListener);

server.listen(1000);
