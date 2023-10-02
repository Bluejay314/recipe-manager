"use strict";

let { Recipe } = require("../models");

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.send({ result: 200, data: recipe });
    }
    catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

const createRecipe = async (data, res) => {
    try {
        const recipe = await new Recipe(data).save();
        res.send({ result: 200, data: recipe });
    }
    catch(err) {
        res.send({ result: 500, error: err.message });
    }
};

const updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

const createRecipeImage = (req, res) => {
    const userUpdates = { 
        image: '/images/' + req.file.filename
    };

    console.log(userUpdates);

    User.findByIdAndUpdate(req.params.userId, userUpdates)
        .then(() => 
            res.status(200).json({ result: 'Image uploaded to profile successfully', data: userUpdates }))
        .catch(err => 
            res.status(500).json({ result: err.message })
    )
}

const deleteRecipe = (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

module.exports = {
    getRecipe,
    createRecipeImage,
    createRecipe,
    updateRecipe,
    deleteRecipe
};