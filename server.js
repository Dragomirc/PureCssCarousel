const http = require("http");
const fs = require("fs");
const path = require("path");

const router = (req, res) => {
  const url = req.url;
  if (url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (err, file) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { ContentType: "text/plain" });
        res.end("file not found");
      }
      res.writeHead(200, { ContentType: "text/html" });
      return res.end(file);
    });
  } else if (url.includes("public")) {
    const extensionType = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      ico: "image/x-icon",
      jpg: "image/jpeg"
    };
    const extension = url.split(".")[1];
    const filePath = path.join(__dirname, req.url);
    console.log("__dirname", __dirname);
    console.log("filePath", filePath);
    fs.readFile(filePath, (err, file) => {
      if (err) {
        console.log(err);
        res.writeHead(404, { ContentType: "text/plain" });
        res.end("Page not found");
      }
      res.writeHead(200, { ContentType: extensionType[extension] });
      res.end(file);
    });
  }
};
const server = http.createServer(router);
server.listen(3000, () => console.log("Server listening on port 3000"));
