global.DEBUG = true;
const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      console.log("root");
      res.writeHead(200, { "Content-type": "text/plain" });
      res.end("root route");
      break;
    case "/about":
      console.log("about");
      res.writeHead(200, { "Content-type": "text/plain" });
      res.end("about route");
      break;
    case "/profile":
      console.log("profile");
      res.writeHead(200, { "Content-type": "text/plain" });
      res.end("profile route");
      break;
    default:
      res.writeHead(400, { "Content-type": "text/plain" });
      res.end("route not found");
      break;
  }
});

server.listen(PORT, () => {
  console.log("server running on port 3000");
});
