require("dotenv").config();

const express = require("express");
const dbConnect = require("./dbConnect");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/recipes", recipeRoutes);
app.use("/user", userRoutes);

app.get("/", (_, res) => {
    res.json({ message: "success" });
});

app.listen(process.env.DB_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.DB_PORT}`);
});