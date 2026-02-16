const express = require("express");
const cors = require("cors");

const personRouter = require("./routers/personRouter");

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5178"
}));

app.use(express.json());

app.use("/people", personRouter);

app.get("/", (req, res) => {
    res.send('<h1>Api birthdaysRememberer Homepage</h1>');
});

app.listen(port, () => {
    console.log(`People birthday app listening on port ${port}`);
});