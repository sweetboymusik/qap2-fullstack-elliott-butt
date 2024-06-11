global.DEBUG = true;

const http = require("http");
const routes = require("./routes");
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  // skip favicon load
  if (req.url === "/favicon.ico") {
    res.writeHead(204, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }

  let path = "./views/";

  // router
  switch (req.url) {
    case "/":
      console.log("root page");
      path += "index.html";
      routes.getPage(path, res);
      break;
    case "/about":
      console.log("about page");
      path += "about.html";
      routes.getPage(path, res);
      break;
    case "/contact":
      console.log("contact page");
      path += "contact.html";
      routes.getPage(path, res);
      break;
    case "/browse":
      console.log("browse page");
      path += "browse.html";
      routes.getPage(path, res);
      break;
    case "/categories":
      console.log("categories page");
      path += "categories.html";
      routes.getPage(path, res);
      break;
    case "/partners":
      console.log("partners page");
      path += "partners.html";
      routes.getPage(path, res);
      break;
    case "/team":
      console.log("team page");
      path += "team.html";
      routes.getPage(path, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      break;
  }
});

server.listen(PORT, () => {
  console.log("server running on port 3000");
});
