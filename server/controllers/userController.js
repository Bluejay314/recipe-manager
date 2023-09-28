"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
let { User } = require("../models");

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
    createUser,
    updateUser,
    deleteUser
};