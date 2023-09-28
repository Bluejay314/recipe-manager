const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    key: {type: Number},
    quantity: {type: Number},
    unit: {type: String},
    name: {type: String, required: true, trim: true},

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("ingredient", ingredientSchema);