const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    key: {type: Number},
    title: {type: String, trim: true, required: true},
    description: {type: String},
    image: {type: String},
    category: {type: String},
    tags: {type: [String]},
    ingredients: {type: [mongoose.Schema.Types.ObjectId], ref: "ingredient"},
    steps: {type: [String], required: true},
    pastVersions: {type: [mongoose.Schema.Types.ObjectId], ref: "recipe"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("recipe", recipeSchema);