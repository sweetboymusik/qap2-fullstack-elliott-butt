const fs = require("fs");

function fetchFile(fileName, response) {
  fs.readFile(fileName, (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(content, "utf-8");
    }
  });
}

function getPage(path, response) {
  fetchFile(path, response);
}

module.exports = {
  getPage,
};
