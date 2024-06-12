const { logEvent } = require("./logs");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}

const emitter = new Emitter();

/*
    homepage visted event

    logs when the home page has been visited

    Use: keep a log of 
*/
emitter.on("homepage", () => {
  console.log("home page has been visited");
  logEvent("home-visit", "HOME VISITED", 200, "");
});

/*
    fetchFile event

    takes in filename and status as params
    writes to console whether successful or not
    depending on status code passed in

    only works for existing routes
    'test' route added in server.js
    fortesting of this event

    use: can alert site admins to any broken routes
*/
emitter.on("fetchFile", (filename, status) => {
  if (status === 200) {
    console.log(`${filename} fetched successfully.`);
    logEvent(
      "fetch-file",
      "FETCH FILE",
      200,
      `SUCCESSFULLY FETCHED [${filename}]`
    );
  } else if (status === 500) {
    console.log(`${filename} failed to fetch. File does not exist.`);
    logEvent("fetch-file", "FETCH FILE", 500, `FAILED TO FETCH [${filename}]`);
  }
});

/*
    404 event

    writes that specified url 
    does not exisit to the console
    differs from fetchFile in that 
    it only works on routes that do NOT exist

    use: good to know what pages
    your visitors are trying to access
    to create explicit redirects
*/
emitter.on("notFound", (url) => {
  console.log(`url ${url} does not exist.`);
  logEvent("not-found", "ROUTE NOT FOUND", 404, `ROUTE-NAME: ${url}`);
});

module.exports = {
  emitter,
};
