const sampleRecipes = require('../data/sampleRecipes.json');

function getAllRecipes(req, res) {
  res.json(sampleRecipes);
}

function getRecipeById(req, res) {
  const id = parseInt(req.params.id, 10);
  const recipe = sampleRecipes.find((item) => item.id === id);
  if (!recipe) {
    return res.status(404).json({ error: 'Recette non trouvée' });
  }
  res.json(recipe);
}

function searchRecipesByIngredient(req, res) {
  const q = (req.query.ingredient || '').toLowerCase();
  if (!q) {
    return res.json(sampleRecipes);
  }
  const results = sampleRecipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(q))
  );
  res.json(results);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  searchRecipesByIngredient,
};
