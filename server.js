const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Models
const db = require("./app/models");

const app = express();

let whiteList = ["http://localhost:8081"];

let corsOption = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== 1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync Database
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({
    message: "Wellcome to REST API",
  });
});

require("./app/routes/post.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Success running on port ${PORT}`);
});
