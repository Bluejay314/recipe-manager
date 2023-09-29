"use strict";

const bcrypt = require("bcrypt");
let { User } = require("../models");
const { createToken } = require("../middleware/auth");

const getUser = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.send({ result: 200, data: data })
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
}

const registerUser = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        if (!(email && password && userName)) {
            res.status(400).json({ result: "All input is required"});
            return;
        }

        const oldUser = await User.findOne({ "email": email});
        if (oldUser) {
            res.status(409).json({ result: "User already exists. Please login" });
            return;
        }

        const formattedEmail = email.toLowerCase();
        const encryptedPassword = await bcrypt.hash(password, 10);
        const userData = {
            userName,
            email: formattedEmail,
            password: encryptedPassword
        }

        const user = await new User(userData).save();
        userData.token = createToken(user._id, email);
        

        res.status(201).json({ result: "User successfully registered", data: userData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "somethin went wrong man!" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).json({ result: "All input is required" });
            return;
        }

        const user = await User.findOne({ "email": email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = createToken(user.id, email);
            user.token = token;

            res.status(200).json({ result: 'User successfully logged in', data: user });
        }
        else res.status(400).json({ result: "Either the email or password was incorrect" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        if(req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body = {...req.body, password: hash};
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        res.send({ result: 200, data: user})
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

const deleteUser = async (req, res) => {
    try {
        const data = await User.findByIdAndRemove(req.params.id, req.body, {
            useFindAndModify: false,
        });

        res.send({ result: 200, data: data });
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

module.exports = {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};