require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token)
        return res.status(403).send("A token is required for authentication");

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        console.log(`key: ${process.env.JWT_KEY}`)
        console.log(`decoded: ${decoded}`)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

const createToken = (userId, userEmail) => {
    const token = jwt.sign(
        { user_id: userId, userEmail },
        process.env.JWT_KEY,
        { expiresIn: "2h" }
    );

    return token;
}

module.exports = { verifyToken, createToken };