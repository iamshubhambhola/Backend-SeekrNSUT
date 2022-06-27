global.rootDir = __dirname;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message:
    "Too many requests created from this IP, please try again after an hour.",
});

const app = express();
app.set("trust proxy", 1);
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));
app.use(morgan("tiny"));

function startServer() {
  app.get("/ping", (req, res) => {
    return res.status(200).json({
      message: "Server is up and running",
    });
  });

  app.use("/", routes);

  app.get("/", (req, res) => {
    return res.send("Welcome to the next big thing!!");
  });

  // route not found
  app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    if (!error.status || error.status === 500) console.log(error);

    res.status(error.status || 500);
    return res.json({
      success: false,
      message: error.message,
    });
  });

  const PORT = process.env.PORT || 5000;
  //Start server
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

const initServer = require("./scripts/initServer");
initServer
  .boot(app)
  .then(() => startServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });