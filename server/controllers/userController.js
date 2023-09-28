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

const createUser = async (data, res) => {
    try {
        const hash = await bcrypt.hash(data.password, 10);
        await new User({...data, password: hash}).save();
        res.send({ result: 200, data: data });
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

const registerUser = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        if (!(email && password && userName)) {
            res.status(400).json({ result: "All input is required"});
            return;
        }
        
        // if(userExists(email)) {
        //     res.status(409).json({ result: "User already exists. boop Please login" });
        //     return;
        // }

        let encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            userName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = createToken(user._id, email);
        user.token = token;

        await user.save();

        res.status(201).json({ result: "User successfully registered", data: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: "somethin went wrong man!" })
    }
}

async function userExists(email) {
    // const oldUser = await User.findOne({ "email": email});
    // if (oldUser) return true;

    return false;
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
    createUser,
    updateUser,
    deleteUser
};