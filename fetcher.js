//A small command line node app which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

const request = require("request");
const fs = require("fs");
const URL = process.argv[2]
const file = process.argv[3]

request.get(URL, function (error, response, body) {
  if (!URL || !file) {
    console.log("Enter valid URL and filepath and run again")
    process.exit()
  }
  if (response.statusCode !== 200) {
    console.log("Couldn't access the URL. Check this and run again")
    process.exit()

  }

  fs.stat(file, function (err) {
    if (err === null) {
      const { size } = fs.statSync(file)
      console.log(`Downloaded and saved ${size} bytes to ${file}`)
    } else {
      fs.writeFile(file, body, "utf8", (err) => {
        const { size } = fs.statSync(file)
        console.log(`Downloaded and saved ${size} bytes to ${file}`)
      });
    };
  });
});























