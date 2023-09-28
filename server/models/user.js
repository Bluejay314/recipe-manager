const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    key: {type: Number},
    name: {type: String, trim: true, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    recipes: {type: mongoose.Schema.Types.ObjectId, ref: "recipe"},

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("user", userSchema);