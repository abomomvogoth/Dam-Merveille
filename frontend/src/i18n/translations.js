export const translations = {
  fr: {
    'header.subtitle': 'Recettes traditionnelles du Cameroun et d\'Afrique — préservez la richesse culinaire de nos cultures.',
    'search.placeholder': 'Rechercher par ingrédient, plat ou région',
    'list.title': 'recettes',
    'list.total': 'au total',
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
    'header.subtitle': 'Traditional Cameroonian and African recipes — preserving the culinary richness of our cultures.',
    'search.placeholder': 'Search by ingredient, dish or region',
    'list.title': 'recipes',
    'list.total': 'total',
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
