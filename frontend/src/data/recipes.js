const recipes = [
  {
    id: 1,
    name: 'Eru',
    region: 'Sud-Ouest',
    origin: "Plat traditionnel du Sud-Ouest du Cameroun, populaire pour les rencontres familiales.",
    description: 'Eru est préparé avec des feuilles vertes, du poisson et de l’huile de palme.',
    photoUrl: 'https://via.placeholder.com/140x100?text=Eru',
    videoUrl: 'https://www.youtube.com/watch?v=example-eru',
    portions: 4,
    ingredients: [
      { name: 'Eru (feuilles)', quantity: '500 g' },
      { name: 'Poisson fumé', quantity: '200 g' },
      { name: 'Huile de palme', quantity: '100 ml' }
    ],
    steps: [
      'Laver et hacher les feuilles.',
      'Faire revenir l’oignon et le poisson.',
      'Ajouter les feuilles et cuire doucement.',
      'Assaisonner et servir chaud.'
    ]
  },
  {
    id: 2,
    name: 'Achu',
    region: 'Nord-Ouest',
    origin: 'Spécialité du Nord-Ouest, servie traditionnellement lors des fêtes.',
    description: 'Achu est un plat de pâte servi avec une sauce jaune et des protéines.',
    photoUrl: 'https://via.placeholder.com/140x100?text=Achu',
    videoUrl: 'https://www.youtube.com/watch?v=example-achu',
    portions: 4,
    ingredients: [
      { name: 'Igname jaune', quantity: '1 kg' },
      { name: 'Huile de palme rouge', quantity: '120 ml' },
      { name: 'Poisson séché', quantity: '150 g' }
    ],
    steps: [
      'Faire cuire la pâte d’igname.',
      'Préparer la sauce jaune.',
      'Servir la pâte avec la sauce.'
    ]
  },
  {
    id: 3,
    name: 'Ndolé',
    region: 'Centre / Sud-Ouest',
    origin: 'Ndolé est un plat national camerounais, souvent accompagné de plantain.',
    description: 'Plat à base de feuilles de ndolé, d’arachides et de viande ou de crevettes.',
    photoUrl: 'https://via.placeholder.com/140x100?text=Ndol%C3%A9',
    videoUrl: 'https://www.youtube.com/watch?v=example-ndole',
    portions: 4,
    ingredients: [
      { name: 'Feuilles de ndolé', quantity: '500 g' },
      { name: 'Arachides mixées', quantity: '150 g' },
      { name: 'Crevettes', quantity: '200 g' }
    ],
    steps: [
      'Bouillir les feuilles de ndolé.',
      'Cuire les crevettes et la viande.',
      'Mélanger avec la pâte d’arachide.'
    ]
  }
];

export default recipes;
