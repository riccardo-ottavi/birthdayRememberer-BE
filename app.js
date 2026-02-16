const express = require("express");

const personRouter = require("./routers/personRouter")

const app = express();

const port = 3000;

app.use("/people", personRouter);

app.get("/", (req, res) => {
    res.send('<h1>Api birthdaysRememberer Homepage</h1>')
})

app.listen(port, () => {
    console.log(`People birthday app listening on port ${port}`);
});