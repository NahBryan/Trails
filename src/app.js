const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");

const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");
const limiter = require("./middleware/rateLimit.middleware");
const sanitize = require("./middleware/sanitize.middleware");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(cookieParser());

app.use(hpp());

app.use(limiter);

app.use(sanitize);

app.use("/api", routes);

app.use(errorMiddleware);

module.exports = app;
