const { getAllRecipes, getRecipeById, searchRecipesByIngredient } = require('../src/controllers/recipesController');
const sampleRecipes = require('../src/data/sampleRecipes.json');

function mockRes() {
  const res = {};
  res.statusCode = 200;
  res.status = jest.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn((payload) => payload);
  return res;
}

describe('recipesController', () => {
  test('getAllRecipes returns all recipes', () => {
    const req = {};
    const res = mockRes();

    getAllRecipes(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(sampleRecipes);
  });

  test('getRecipeById returns 404 when recipe not found', () => {
    const req = { params: { id: '99999' } };
    const res = mockRes();

    getRecipeById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Recette non trouvée' });
  });

  test('getRecipeById returns recipe when found', () => {
    const first = sampleRecipes[0];
    const req = { params: { id: String(first.id) } };
    const res = mockRes();

    getRecipeById(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(first);
  });

  test('searchRecipesByIngredient returns all when ingredient empty', () => {
    const req = { query: { ingredient: '' } };
    const res = mockRes();

    searchRecipesByIngredient(req, res);

    expect(res.json).toHaveBeenCalledWith(sampleRecipes);
  });

  test('searchRecipesByIngredient searches by ingredient name (case-insensitive)', () => {
    // Find an ingredient term that is guaranteed to exist
    const recipe = sampleRecipes[0];
    const term = recipe.ingredients[0].name.split(' ')[0];

    const req = { query: { ingredient: term.toUpperCase() } };
    const res = mockRes();

    searchRecipesByIngredient(req, res);

    expect(res.json).toHaveBeenCalled();
    const results = res.json.mock.calls[0][0];
    expect(Array.isArray(results)).toBe(true);

    // Every returned recipe must contain the ingredient match
    results.forEach((r) => {
      expect(r.ingredients.some((ing) => ing.name.toLowerCase().includes(term.toLowerCase()))).toBe(true);
    });
  });
});

