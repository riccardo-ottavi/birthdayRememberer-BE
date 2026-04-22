require("dotenv").config();
require("./data/db");

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRouter = require("./routers/authRoutes");
const personRouter = require("./routers/personRouter");

const app = express();
const port = 3000;

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, 
  standardHeaders: true,
  legacyHeaders: false
});

app.use(globalLimiter);


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json({ limit: "10kb" })); 


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10 
});

app.use("/auth", authLimiter, authRouter);

app.use("/people", personRouter);

app.get("/", (req, res) => {
  res.send("<h1>Api birthdaysRememberer Homepage</h1>");
});

app.listen(port, () => {
  console.log(`People birthday app listening on port ${port}`);
});