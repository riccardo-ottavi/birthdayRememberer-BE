require("dotenv").config();
require("./data/db");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRouter = require("./routers/authRoutes");
const personRouter = require("./routers/personRouter");

const app = express();
const PORT = process.env.PORT || 10000;

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, 
  standardHeaders: true,
  legacyHeaders: false
});

app.use(globalLimiter);


const allowedOrigins = [
  "http://localhost:5173",
  "https://birthday-rememberer-j1q8g436y-riccardo-ottavis-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: "10kb" })); 
app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10 
});

app.use("/auth", authLimiter, authRouter);

app.use("/people", personRouter);

app.get("/", (req, res) => {
  res.send("<h1>Api birthdaysRememberer Homepage</h1>");
});

app.listen(PORT, () => {
  console.log(`People birthday app listening on port ${PORT}`);
});