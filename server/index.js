require("dotenv").config();

const express = require("express");
const dbConnect = require("./dbConnect");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "success" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});