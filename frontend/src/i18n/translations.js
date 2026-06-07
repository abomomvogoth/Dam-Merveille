export const translations = {
  fr: {
    'header.subtitle': 'Recettes traditionnelles du Nord-Ouest et du Sud-Ouest du Cameroun.',
    'search.placeholder': 'Rechercher par ingrédient, plat ou région',
    'list.title': 'Recettes',
    'list.empty': 'Aucune recette trouvée.',
    'detail.origin': 'Origine',
    'detail.region': 'Région',
    'detail.portions': 'Portions',
    'detail.ingredients': 'Ingrédients',
    'detail.steps': 'Préparation',
    'detail.video': 'Voir la vidéo de préparation',
    'detail.empty': 'Sélectionne une recette pour voir les détails.',
  },
  en: {
    'header.subtitle': 'Traditional recipes from the Northwest and Southwest regions of Cameroon.',
    'search.placeholder': 'Search by ingredient, dish or region',
    'list.title': 'Recipes',
    'list.empty': 'No recipes found.',
    'detail.origin': 'Origin',
    'detail.region': 'Region',
    'detail.portions': 'Servings',
    'detail.ingredients': 'Ingredients',
    'detail.steps': 'Preparation',
    'detail.video': 'View preparation video',
    'detail.empty': 'Select a recipe to see details.',
  },
};

export function getTranslation(language, key) {
  return translations[language]?.[key] || key;
}
