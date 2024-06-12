const fs = require("fs");
const { emitter } = require("./events");

function fetchFile(filename, response) {
  fs.readFile(filename, (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 Internal Server Error");
      emitter.emit("fetchFile", filename, 500);
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(content, "utf-8");
      emitter.emit("fetchFile", filename, 200);
    }
  });
}

function getPage(path, response) {
  fetchFile(path, response);
}

module.exports = {
  getPage,
};
