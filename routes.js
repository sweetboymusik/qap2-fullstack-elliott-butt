const fs = require("fs");
const weather = require("weather-js");
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

function getAdmin(filename, response) {
  fs.readFile(filename, (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 Internal Server Error");
      emitter.emit("fetchFile", filename, 500);
    } else {
      response.writeHead(511, { "Content-Type": "text/html" });
      response.end(content, "utf-8");
      emitter.emit("fetchFile", filename, 511);
    }
  });
}

function getSecret(res) {
  emitter.emit("secretAccessed");
  res.writeHead(403);
  res.end();
}

function getWeather(response) {
  weather.find(
    { search: "St. John's, Canada", degreeType: "C" },
    function (err, result) {
      if (err) console.log(err);
      let weatherString = JSON.stringify(result, null, 2);
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(weatherString, "utf-8");
    }
  );
}

module.exports = {
  getPage,
  getAdmin,
  getSecret,
  getWeather,
};
