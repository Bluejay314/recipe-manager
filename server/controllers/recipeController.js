"use strict";

let { Recipe } = require("../models");

const getRecipes = (res) => {
    Recipe.find({})
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

const getRecipe = (req, res) => {
    Recipe.findById(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

const createRecipe = (data, res) => {
    new Recipe(data).save()
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

const updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

const deleteRecipe = (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

module.exports = {
    getRecipe,
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
};