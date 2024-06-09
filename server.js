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
  switch (req.url) {
    case "/":
      console.log("root");
      path += "index.html";
      routes.homePage(path, res);
      break;
    case "/about":
      console.log("about");
      path += "about.html";
      routes.aboutPage(path, res);
      break;
    case "/contact":
      console.log("contact");
      path += "contact.html";
      routes.contactPage(path, res);
      break;
    case "/browse":
      console.log("browse");
      path += "browse.html";
      routes.browsePage(path, res);
      break;
    case "/categories":
      console.log("categories");
      path += "categories.html";
      routes.categoriesPage(path, res);
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
