const { recipeModel } = require('../models/recipe.js');
const { sendError, sendSuccess } = require('../utility/response.js');
const multer = require('multer');
const path = require('path');


const imagePath = path.join(__dirname, '../public/images');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagePath)
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

const getRecipes = async (req, res) => {
    try {
        const allRecipes = await recipeModel.find();
        if (allRecipes.length === 0) {
            return sendSuccess(res, "No recipes found");
        }
        return sendSuccess(res, undefined, allRecipes);
    } catch (error) {
        return sendError(res, error.message, error);
    }
};

const getRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeModel.findById(recipeId);
        if (!recipe) {
            return sendError(res, "Recipe not found")
        }
        return sendSuccess(res, undefined, recipe);
    } catch (error) {
        return sendError(res, error.message, error);
    }
}

const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time, likes } = req.body;
        if (!title || !ingredients || !instructions || !time) {
            return sendError(res, "Missing Data", 404);
        }
        const coverImg = req.file;
        const ingredientsArray = ingredients.split(',');
        const newRecipe = await new recipeModel({ title, ingredientsArray, instructions, time, coverImg: coverImg.filename, likes, createdBy: req.user.id });
        const savedRecipe = await newRecipe.save();
        return sendSuccess(res, "Recipe uploaded", savedRecipe, 201);
    } catch (error) {
        return sendError(res, error.message, error);
    }
}

const editRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;
        const recipeId = req.params.id;
        const coverImg = req.file;
        const recipe = await recipeModel.findById(recipeId);
        if (!recipe) {
            return sendError(res, "Recipe not found", 404);
        }
        const updatedRecipe = await recipeModel.findByIdAndUpdate(recipeId, { title, ingredients, instructions, time, coverImg: coverImg.filename }, { new: true });
        return sendSuccess(res, "Updated successfully", updatedRecipe);
    } catch (error) {
        return sendError(res, error.message, error);
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeModel.findByIdAndDelete(recipeId);
        if (!recipe) {
            return sendError(res);
        }
        return sendSuccess(res, "Successfully deleted");
    } catch (error) {
        return sendError(res, error.message, error);
    }
}

const getUserRecipe = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipes = await recipeModel.find({ createdBy: userId });
        if (!recipes) {
            return sendError(res, "Not found", 200);
        }
        return sendSuccess(res, "Recipes found", recipes);
    } catch (error) {
        return sendError(res, error.message, error);
    }
}

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload, getUserRecipe };