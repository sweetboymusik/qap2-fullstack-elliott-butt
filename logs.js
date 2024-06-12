const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const { format, getYear } = require("date-fns");
const { v4: uuid } = require("uuid");

const ROOT = "logs/";

async function logEvent(subfolder, event, level, message) {
  const date = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const item = `${date}\t${level}\t${event}\t${message}\t${uuid()}`;

  try {
    const folder = ROOT + subfolder + "/" + getYear(new Date());

    // create root if not doesn't exist
    if (!fs.existsSync(path.join(__dirname, ROOT)))
      await fsPromises.mkdir(path.join(__dirname, ROOT));

    // create event subfolder if doesn't exist
    if (!fs.existsSync(path.join(__dirname, ROOT + subfolder)))
      await fsPromises.mkdir(path.join(__dirname, ROOT + subfolder));

    // create year subfolder if doesn't exist
    if (!fs.existsSync(path.join(__dirname, folder)))
      await fsPromises.mkdir(path.join(__dirname, folder));

    const filename =
      `${format(new Date(), "yyyyMMdd")}-` + `${subfolder}-events.log`;

    await fsPromises.appendFile(
      path.join(__dirname, folder, filename),
      item + "\n"
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  logEvent,
};
