const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    key: {type: Number},
    title: {type: String, trim: true, required: true},
    description: {type: String},
    image: {type: String, default: "/images/default.jpg"},
    tags: {type: [String], default: []},
    ingredients: {type: [String], default: []},
    steps: {type: [String], default: []},
    favourite: {type: Boolean, default: false},
    pastVersions: {type: [mongoose.Schema.Types.ObjectId], ref: "recipe"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("recipe", recipeSchema);