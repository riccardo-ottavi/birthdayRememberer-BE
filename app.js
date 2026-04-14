require("dotenv").config();
require("./data/db");
const express = require("express");
const cors = require("cors");

const authRouter = require("./routers/authRoutes");
const personRouter = require("./routers/personRouter");

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/people", personRouter);

app.get("/", (req, res) => {
    res.send('<h1>Api birthdaysRememberer Homepage</h1>');
});

app.listen(port, () => {
    console.log(`People birthday app listening on port ${port}`);
});