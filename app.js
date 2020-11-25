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
const Skill = db.skill;
// const User = db.user;
db.sequelize
  .sync(/* { force: true } */)
  .then(() => {
    // initial();
    console.log("Connection to db succesfull...");
  })
  .catch((err) => {
    console.log(err);
  });

async function initial() {
  await Skill.create({
    name: "JavaScript",
  });
  await Skill.create({
    name: "Python",
  });
  await Skill.create({
    name: "Java",
  });
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the web Api for SearchDeveloper" });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/skill.routes")(app);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
