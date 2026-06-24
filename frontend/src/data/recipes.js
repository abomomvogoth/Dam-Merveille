// TasteCam Heritage — 10 Traditional Cameroonian & African Recipes
import eruImg from '../assets/recipes/eru.jpeg';
import arachideImg from '../assets/recipes/arachide.jpeg';
import bouillonImg from '../assets/recipes/bouillon au machoiron.jpeg';
import kokiImg from '../assets/recipes/koki.jpeg';
import kokoImg from '../assets/recipes/koko.jpeg';
import mbongoImg from '../assets/recipes/mbongo tchobi.jpeg';
import ndoleImg from '../assets/recipes/ndole.jpeg';
import okokImg from '../assets/recipes/okok.jpeg';
import sangaImg from '../assets/recipes/sanga.jpeg';
import sauceJauneImg from '../assets/recipes/sauce jaune.jpeg';

const recipes = [
  {
    id: 1,
    name: 'Eru',
    nameEn: 'Eru',
    region: 'Sud-Ouest',
    regionEn: 'Southwest',
    origin: 'Plat traditionnel des peuplements Bamiléké et Bassas, apprécié pour sa richesse et sa valeur communautaire.',
    originEn: 'Traditional dish of the Bamiléké and Basaa peoples, valued for its richness and community significance.',
    description: "L'Eru est un plat riche du Sud-Ouest du Cameroun, préparé avec des feuilles vertes, du poisson fumé et de l'huile de palme. Servi avec du water-fufu ou du plantain.",
    descriptionEn: 'Eru is a rich dish from Southwest Cameroon, prepared with green leaves, smoked fish and palm oil. Served with water-fufu or plantain.',
    photoUrl: eruImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-eru',
    portions: 4,
    ingredients: [
      { name: 'Eru (feuilles)', nameEn: 'Eru leaves', quantity: '500 g' },
      { name: 'Ndolé (feuilles amères)', nameEn: 'Bitterleaf', quantity: '250 g' },
      { name: 'Poisson fumé', nameEn: 'Smoked fish', quantity: '200 g' },
      { name: 'Huile de palme', nameEn: 'Palm oil', quantity: '100 ml' },
      { name: 'Oignon', nameEn: 'Onion', quantity: '1' }
    ],
    steps: [
      'Nettoyer et couper les feuilles d\'eru et de ndolé.',
      'Faire revenir l\'oignon et le poisson avec l\'huile de palme.',
      'Ajouter les feuilles et laisser mijoter jusqu\'à tendreté.',
      'Assaisonner et servir chaud avec water-fufu ou plantain.'
    ],
    stepsEn: [
      'Clean and cut the eru and ndolé leaves.',
      'Sauté onion and fish with palm oil.',
      'Add the leaves and simmer until tender.',
      'Season and serve hot with water-fufu or plantain.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 2,
    name: 'Achu — Sauce Jaune',
    nameEn: 'Achu — Yellow Soup',
    region: 'Nord-Ouest',
    regionEn: 'Northwest',
    origin: "Plat emblématique de la région du Nord-Ouest, souvent préparé pour les fêtes et les cérémonies traditionnelles.",
    originEn: 'Iconic dish of the Northwest region, often prepared for festivals and traditional ceremonies.',
    description: "L'Achu est une pâte d'igname jaune servie avec une sauce jaune épicée à base d'huile de palme, de piment et d'oignons. Accompagné de poisson séché ou de viande.",
    descriptionEn: 'Achu is a yellow yam paste served with a spicy yellow soup made from palm oil, peppers and onions. Accompanied by dried fish or meat.',
    photoUrl: sauceJauneImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-achu',
    portions: 4,
    ingredients: [
      { name: 'Igname jaune', nameEn: 'Yellow yam', quantity: '1 kg' },
      { name: 'Piment', nameEn: 'Pepper', quantity: '2' },
      { name: 'Poisson séché', nameEn: 'Dried fish', quantity: '150 g' },
      { name: 'Huile de palme rouge', nameEn: 'Red palm oil', quantity: '120 ml' },
      { name: 'Oignon', nameEn: 'Onion', quantity: '2' }
    ],
    steps: [
      'Faire bouillir l\'igname jusqu\'à ce qu\'elle soit tendre, puis la piler en pâte homogène.',
      'Préparer la sauce jaune avec l\'huile de palme, les oignons et le piment.',
      'Ajouter le poisson séché dans la sauce et laisser mijoter.',
      'Servir la pâte d\'igname avec la sauce jaune bien chaude.'
    ],
    stepsEn: [
      'Boil yam until tender, then pound into a smooth paste.',
      'Prepare the yellow soup with palm oil, onions and pepper.',
      'Add dried fish to the sauce and simmer.',
      'Serve yam paste with hot yellow soup.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 3,
    name: 'Ndolé',
    nameEn: 'Ndolé',
    region: 'Centre / Sud-Ouest',
    regionEn: 'Centre / Southwest',
    origin: "Plat national camerounais, originaire des régions du Centre et du Sud-Ouest. Considéré comme le plat emblématique du pays.",
    originEn: 'Cameroonian national dish, originating from the Centre and Southwest regions. Considered the country\'s emblematic dish.',
    description: 'Le Ndolé est une spécialité à base de feuilles de ndolé (feuilles amères), d\'arachides mixées, de crevettes et de viande. Servi avec du plantain ou du riz.',
    descriptionEn: 'Ndolé is a specialty made with bitterleaf, ground peanuts, shrimp and meat. Served with plantain or rice.',
    photoUrl: ndoleImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-ndole',
    portions: 4,
    ingredients: [
      { name: 'Feuilles de ndolé', nameEn: 'Bitterleaf', quantity: '500 g' },
      { name: 'Crevettes', nameEn: 'Shrimp', quantity: '200 g' },
      { name: 'Viande fumée', nameEn: 'Smoked meat', quantity: '200 g' },
      { name: 'Arachides mixées', nameEn: 'Ground peanuts', quantity: '150 g' },
      { name: 'Huile de palme', nameEn: 'Palm oil', quantity: '100 ml' }
    ],
    steps: [
      'Bouillir les feuilles de ndolé et les écraser finement.',
      'Faire cuire la viande et les crevettes avec les arachides et l\'huile.',
      'Ajouter les feuilles et laisser mijoter jusqu\'à épaississement.',
      'Servir chaud avec du plantain frit ou du riz.'
    ],
    stepsEn: [
      'Boil the bitterleaf and grind finely.',
      'Cook meat and shrimp with ground peanuts and oil.',
      'Add the leaves and simmer until thickened.',
      'Serve hot with fried plantain or rice.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 4,
    name: 'Sanga',
    nameEn: 'Sanga',
    region: 'Littoral',
    regionEn: 'Coastal',
    origin: 'Plat traditionnel des peuples du littoral camerounais, particulièrement apprécié dans les zones côtières.',
    originEn: 'Traditional dish of Cameroon\'s coastal peoples, particularly enjoyed in coastal areas.',
    description: 'Le Sanga est un plat savoureux préparé à partir de maïs frais, de feuilles de cocoyam et d\'huile de palme. Un mélange riche en nutriments.',
    descriptionEn: 'Sanga is a flavorful dish made from fresh maize, cocoyam leaves and palm oil. A nutrient-rich blend.',
    photoUrl: sangaImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-sanga',
    portions: 4,
    ingredients: [
      { name: 'Maïs frais', nameEn: 'Fresh maize', quantity: '500 g' },
      { name: 'Feuilles de cocoyam', nameEn: 'Cocoyam leaves', quantity: '300 g' },
      { name: 'Huile de palme', nameEn: 'Palm oil', quantity: '100 ml' },
      { name: 'Poisson fumé', nameEn: 'Smoked fish', quantity: '150 g' },
      { name: 'Sel et épices', nameEn: 'Salt and spices', quantity: 'Au goût' }
    ],
    steps: [
      'Égrener le maïs frais et le moudre grossièrement.',
      'Laver et couper les feuilles de cocoyam.',
      'Mélanger le maïs avec les feuilles et l\'huile de palme.',
      'Cuire à la vapeur jusqu\'à ce que le mélange soit ferme.',
      'Servir chaud avec du poisson fumé.'
    ],
    stepsEn: [
      'Shell the fresh maize and grind coarsely.',
      'Wash and cut the cocoyam leaves.',
      'Mix maize with leaves and palm oil.',
      'Steam until the mixture is firm.',
      'Serve hot with smoked fish.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 5,
    name: 'Okok',
    nameEn: 'Okok',
    region: 'Forêt / Centre',
    regionEn: 'Forest / Centre',
    origin: 'Spécialité des régions forestières du Cameroun, préparée avec des feuilles d\'okok soigneusement pilées.',
    originEn: 'Specialty of Cameroon\'s forest regions, prepared with carefully pounded okok leaves.',
    description: "L'Okok est un mets traditionnel à base de feuilles d'okok finement pilées mélangées à des arachides, de l'huile de palme et des épices. Accompagné de bâtons de manioc.",
    descriptionEn: 'Okok is a traditional dish made from finely pounded okok leaves mixed with peanuts, palm oil and spices. Accompanied by cassava sticks.',
    photoUrl: okokImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-okok',
    portions: 4,
    ingredients: [
      { name: 'Feuilles d\'okok', nameEn: 'Okok leaves', quantity: '400 g' },
      { name: 'Arachides mixées', nameEn: 'Ground peanuts', quantity: '200 g' },
      { name: 'Huile de palme', nameEn: 'Palm oil', quantity: '80 ml' },
      { name: 'Poisson fumé', nameEn: 'Smoked fish', quantity: '150 g' },
      { name: 'Oignon', nameEn: 'Onion', quantity: '1' }
    ],
    steps: [
      'Piler finement les feuilles d\'okok.',
      'Mixer les arachides et les ajouter aux feuilles.',
      'Ajouter l\'huile de palme, le poisson et les oignons.',
      'Cuire à feu doux en remuant régulièrement.',
      'Servir avec des bâtons de manioc.'
    ],
    stepsEn: [
      'Pound the okok leaves finely.',
      'Grind the peanuts and add to the leaves.',
      'Add palm oil, fish and onions.',
      'Cook on low heat, stirring regularly.',
      'Serve with cassava sticks.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 6,
    name: 'Koki',
    nameEn: 'Koki',
    region: 'Centre / Sud',
    regionEn: 'Centre / South',
    origin: "Le Koki est un plat traditionnel camerounais à base de niébé (haricots noirs), cuit à la vapeur dans des feuilles de bananier.",
    originEn: 'Koki is a traditional Cameroonian dish made from black-eyed peas, steamed in banana leaves.',
    description: 'Le Koki est un gâteau de haricots cuit à la vapeur, préparé à partir de niébé mixé, d\'huile de palme et d\'épices. Un plat nutritif et savoureux.',
    descriptionEn: 'Koki is a steamed bean cake made from blended black-eyed peas, palm oil and spices. A nutritious and tasty meal.',
    photoUrl: kokiImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-koki',
    portions: 4,
    ingredients: [
      { name: 'Niébé (haricots noirs)', nameEn: 'Black-eyed peas', quantity: '500 g' },
      { name: 'Huile de palme rouge', nameEn: 'Red palm oil', quantity: '150 ml' },
      { name: 'Piment', nameEn: 'Pepper', quantity: '2' },
      { name: 'Oignon', nameEn: 'Onion', quantity: '1' },
      { name: 'Sel', nameEn: 'Salt', quantity: 'Au goût' }
    ],
    steps: [
      'Tremper le niébé dans l\'eau toute une nuit.',
      'Enlever la peau des haricots et les mixer en pâte.',
      'Ajouter l\'huile de palme, l\'oignon haché et le piment.',
      'Verser dans des feuilles de bananier et cuire à la vapeur.',
      'Servir chaud avec du plantain ou du manioc.'
    ],
    stepsEn: [
      'Soak black-eyed peas in water overnight.',
      'Remove the skins and blend into a paste.',
      'Add palm oil, chopped onion and pepper.',
      'Pour into banana leaves and steam.',
      'Serve hot with plantain or cassava.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 7,
    name: 'Koko',
    nameEn: 'Koko',
    region: 'Est',
    regionEn: 'East',
    origin: 'Plat traditionnel de la région de l\'Est du Cameroun, préparé avec des légumes sauvages de la forêt.',
    originEn: 'Traditional dish from the East region of Cameroon, prepared with wild forest vegetables.',
    description: 'Le Koko est un plat à base de feuilles de manioc fermentées, cuites avec de l\'huile de palme et des épices. Accompagné de couscous de manioc.',
    descriptionEn: 'Koko is a dish made from fermented cassava leaves, cooked with palm oil and spices. Served with cassava couscous.',
    photoUrl: kokoImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-koko',
    portions: 4,
    ingredients: [
      { name: 'Feuilles de manioc fermentées', nameEn: 'Fermented cassava leaves', quantity: '500 g' },
      { name: 'Huile de palme', nameEn: 'Palm oil', quantity: '100 ml' },
      { name: 'Poisson fumé', nameEn: 'Smoked fish', quantity: '200 g' },
      { name: 'Arachides', nameEn: 'Peanuts', quantity: '100 g' },
      { name: 'Épis de maïs', nameEn: 'Corn on the cob', quantity: '2' }
    ],
    steps: [
      'Broyer les feuilles de manioc fermentées.',
      'Chauffer l\'huile de palme et ajouter les feuilles.',
      'Ajouter le poisson fumé, les arachides et les épis de maïs.',
      'Laisser mijoter jusqu\'à ce que les feuilles soient tendres.',
      'Servir avec du couscous de manioc.'
    ],
    stepsEn: [
      'Grind the fermented cassava leaves.',
      'Heat palm oil and add the leaves.',
      'Add smoked fish, peanuts and corn.',
      'Simmer until the leaves are tender.',
      'Serve with cassava couscous.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 8,
    name: 'Bouillon de Machoiron',
    nameEn: 'Catfish Pepper Soup',
    region: 'Côtière / Littoral',
    regionEn: 'Coastal',
    origin: 'Soupe de poisson populaire dans les régions côtières d\'Afrique centrale, appréciée pour ses vertus réchauffantes.',
    originEn: 'Popular fish soup in Central African coastal regions, valued for its warming properties.',
    description: 'Un bouillon épicé et aromatique préparé avec du machoiron (poisson-chat) frais, des herbes locales et des épices traditionnelles.',
    descriptionEn: 'A spicy and aromatic broth made with fresh catfish, local herbs and traditional spices.',
    photoUrl: bouillonImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-bouillon',
    portions: 4,
    ingredients: [
      { name: 'Machoiron (poisson-chat)', nameEn: 'Catfish', quantity: '1 kg' },
      { name: 'Piment frais', nameEn: 'Fresh pepper', quantity: '3' },
      { name: 'Gingembre', nameEn: 'Ginger', quantity: '50 g' },
      { name: 'Feuilles de laurier', nameEn: 'Bay leaves', quantity: '3' },
      { name: 'Oignon', nameEn: 'Onion', quantity: '1' }
    ],
    steps: [
      'Nettoyer et couper le poisson en morceaux.',
      'Faire bouillir de l\'eau avec les épices et les herbes.',
      'Ajouter le poisson et cuire 15-20 minutes.',
      'Assaisonner avec du sel et du piment.',
      'Servir chaud dans des bols.'
    ],
    stepsEn: [
      'Clean and cut the fish into pieces.',
      'Boil water with spices and herbs.',
      'Add the fish and cook for 15-20 minutes.',
      'Season with salt and pepper.',
      'Serve hot in bowls.'
    ],
    language: 'fr',
    category: 'Soupe'
  },
  {
    id: 9,
    name: 'Mbongo Tchobi',
    nameEn: 'Mbongo Tchobi',
    region: 'Centre / Littoral',
    regionEn: 'Centre / Coastal',
    origin: 'Plat traditionnel camerounais reconnaissable à sa couleur noire distinctive obtenue par des épices torréfiées.',
    originEn: 'Traditional Cameroonian dish recognizable by its distinctive black color obtained from roasted spices.',
    description: 'Le Mbongo Tchobi est un ragoût de poisson ou de viande préparé avec des épices noircies qui lui donnent sa couleur sombre caractéristique et sa saveur fumée. Servi avec du plantain ou du manioc.',
    descriptionEn: 'Mbongo Tchobi is a fish or meat stew prepared with blackened spices giving it its characteristic dark color and smoky flavor. Served with plantain or cassava.',
    photoUrl: mbongoImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-mbongo',
    portions: 4,
    ingredients: [
      { name: 'Poisson ou viande', nameEn: 'Fish or meat', quantity: '800 g' },
      { name: 'Épices Mbongo Tchobi', nameEn: 'Mbongo Tchobi spices', quantity: '3 c. à soupe' },
      { name: 'Huile de palme', nameEn: 'Palm oil', quantity: '80 ml' },
      { name: 'Oignon', nameEn: 'Onion', quantity: '2' },
      { name: 'Ail', nameEn: 'Garlic', quantity: '3 gousses' }
    ],
    steps: [
      'Torréfier les épices Mbongo Tchobi jusqu\'à ce qu\'elles noircissent.',
      'Faire revenir l\'oignon et l\'ail dans l\'huile de palme.',
      'Ajouter le poisson ou la viande et les épices torréfiées.',
      'Couvrir d\'eau et laisser mijoter 30 minutes.',
      'Servir avec du plantain frit ou du manioc.'
    ],
    stepsEn: [
      'Roast the Mbongo Tchobi spices until they blacken.',
      'Sauté onion and garlic in palm oil.',
      'Add fish or meat and roasted spices.',
      'Cover with water and simmer for 30 minutes.',
      'Serve with fried plantain or cassava.'
    ],
    language: 'fr',
    category: 'Plat principal'
  },
  {
    id: 10,
    name: 'Sauce Arachide',
    nameEn: 'Groundnut Sauce',
    region: 'Nord / Adamaoua',
    regionEn: 'North / Adamawa',
    origin: "La sauce arachide est un pilier de la cuisine camerounaise, particulièrement populaire dans les régions du Nord et de l'Adamaoua.",
    originEn: 'Groundnut sauce is a staple of Cameroonian cuisine, particularly popular in the North and Adamawa regions.',
    description: 'Une sauce riche et crémeuse à base d\'arachides pilées, cuite avec du poisson ou de la viande et servie avec du couscous de manioc ou du riz.',
    descriptionEn: 'A rich and creamy sauce made from ground peanuts, cooked with fish or meat and served with cassava couscous or rice.',
    photoUrl: arachideImg,
    videoUrl: 'https://www.youtube.com/watch?v=example-arachide',
    portions: 4,
    ingredients: [
      { name: 'Arachides', nameEn: 'Peanuts', quantity: '300 g' },
      { name: 'Poisson ou poulet', nameEn: 'Fish or chicken', quantity: '500 g' },
      { name: 'Tomates', nameEn: 'Tomatoes', quantity: '3' },
      { name: 'Oignon', nameEn: 'Onion', quantity: '1' },
      { name: 'Huile de palme', nameEn: 'Palm oil', quantity: '60 ml' }
    ],
    steps: [
      'Piler les arachides ou les mixer en pâte fine.',
      'Faire revenir l\'oignon et les tomates dans l\'huile.',
      'Ajouter la pâte d\'arachide et mélanger.',
      'Ajouter le poisson ou le poulet et laisser mijoter.',
      'Servir chaud avec du couscous de manioc ou du riz.'
    ],
    stepsEn: [
      'Grind the peanuts into a fine paste.',
      'Sauté onion and tomatoes in oil.',
      'Add the peanut paste and stir.',
      'Add fish or chicken and simmer.',
      'Serve hot with cassava couscous or rice.'
    ],
    language: 'fr',
    category: 'Sauce'
  }
];

export default recipes;
