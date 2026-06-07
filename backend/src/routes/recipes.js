const express = require('express');
const { getAllRecipes, getRecipeById, searchRecipesByIngredient } = require('../controllers/recipesController');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/search', searchRecipesByIngredient);
router.get('/:id', getRecipeById);

module.exports = router;
