const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    key: {type: Number},
    name: {type: String, required: true, trim: true},

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("tag", tagSchema);