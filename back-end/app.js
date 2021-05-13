const express = require("express");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const logger = require("morgan");
const path = require("path");
const { connect } = require("mongoose");
require("dotenv").config();
const User = require("./models/userModel");

const indexRouter = require("./routes/indexRouter");

const app = express();

app.use(logger("dev"));
app.use(express.static(path.join(process.env.PWD, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

const PORT = process.env.PORT || 2208;

app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}.`);

  connect(
    /*process.env.DB_CONNECTION,*/ "mongodb://localhost:27017/Elbrus-Family",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log("DATABASE ON 27017");
    }
  );
});

module.exports = app;
