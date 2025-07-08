const express = require('express');
const router = express.Router();
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload, getUserRecipe } = require('../controllers/recipe.js');
const { verifyToken } = require('../middleware/auth.js');

router.get('/', getRecipes);
router.post('/', upload.single('coverImg'), verifyToken, addRecipe);
router.get('/my', verifyToken, getUserRecipe);
router.get('/:id', getRecipe);
router.put('/:id', editRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;