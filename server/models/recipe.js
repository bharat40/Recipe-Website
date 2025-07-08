const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });


const recipeModel = mongoose.model('Recipes', recipeSchema);
module.exports = { recipeModel };