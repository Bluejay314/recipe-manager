const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "success" });
});

app.listen(3010, () => {
    console.log(`Server is running on http://localhost:${3010}`);
});