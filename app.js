const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connection to db succesfull..");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the web Api for SearchDeveloper" });
});

// routes
require("./routes/auth.routes")(app);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
