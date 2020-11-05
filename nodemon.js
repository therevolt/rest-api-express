var nodemon = require("nodemon");
nodemon({
  script: "server.js",
});

nodemon
  .on("start", function () {
    console.log("Start. . .");
  })
  .on("quit", function () {
    console.log("App has quit");
    process.exit();
  })
  .on("restart", function (files) {
    console.log("Merestart Program");
  });
