const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const Skill = db.skill;
const data = require("./config/skills.config");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connection to db succesfull...");
    Skill.bulkCreate(data)
      .then(() => {
        console.log("Skills updated");
      })
      .catch((e) => {
        console.error(e);
      });
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the web Api for SearchDeveloper" });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/skill.routes")(app);
require("./routes/developer.routes")(app);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
