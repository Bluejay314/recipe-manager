"use strict";

let { Recipe } = require("../models");

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        res.send({ result: 200, data: recipe });
    } catch (err) {
        res.send({ result: 500, error: err.message });
    }
};

const getUserRecipes = async (req, res) => {
    try {
        let recipe;
        if(req.query.amount && req.query.amount != -1) {
            const limit = Number(req.query.amount);
            recipe = await Recipe.find({ user: req.params.id }).limit(limit);
        }
        else 
            recipe = await Recipe.find({ user: req.params.id });
        res.send({ result: 200, data: recipe });
    } catch (err) {
        res.send({ result: 500, error: err.message });
    }
};

const searchRecipes = async (req, res) => {
    const searchTerm = req.params.q;
    const userId = req.params.id;
    console.log(`searchterm: ${searchTerm}, ${typeof searchTerm}`)
    try {
        let recipes = await Recipe.find({
            user: userId,
            $or: [
              { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in title
              { tags: { $in: [searchTerm] } }, // Search for searchTerm in the tags array
            ],
          })
          .sort({
            // Sort the results based on whether searchTerm is in both title and tags
            score: {
              $meta: "textScore", // Using text score for sorting
            },
          });
    
          res.send({status: 200, data: recipes})
    }
    catch(err) {
        res.send({status:500, data: err.message})
    }
    
}

const getFavourites = async (req, res) => {
    try {
        const recipes = await Recipe.find({
            user:req.params.id,
            favourite: {"$eq": true}
        });
        
        res.send({ result: 200, data: recipes });
    } catch (err) {
        res.send({ result: 500, error: err.message });
    }
}

const createRecipe = async (req, res) => {
    try {
        let data = req.body;
        if (req.file) data = { ...data, image: "/images/" + req.file.filename };

        data.tags = data.tags.split(/\s*,\s*/);
        const recipe = await new Recipe(data).save();

        res.send({ result: 200, data: recipe });
    } catch (err) {
        res.send({ result: 500, sss: req.body.data, error: err.message });
    }
};

const updateRecipe = (req, res) => {
    console.dir(`body: ${req.body.title}`)
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

const createRecipeImage = (req, res) => {
    const update = {
        image: "/images/" + req.file.filename,
    };

    Recipe.findByIdAndUpdate(req.params.id, update)
        .then(() =>
            res
                .status(200)
                .json({
                    result: "Image uploaded to profile successfully",
                    data: update,
                })
        )
        .catch((err) => res.status(500).json({ result: err.message }));
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
    getUserRecipes,
    getFavourites,
    createRecipeImage,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes
};
