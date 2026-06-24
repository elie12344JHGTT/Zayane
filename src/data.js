export const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' });
export const cdfMoney = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF', maximumFractionDigits: 0 });
export const USD_TO_CDF = 2850;

export const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'robes', label: 'Robes' },
  { id: 'chemises', label: 'Chemises' },
  { id: 'pantalons', label: 'Pantalons' },
  { id: 'pulls', label: 'Pulls' },
  { id: 'cardigans', label: 'Cardigans' },
  { id: 'ponchos', label: 'Ponchos' },];

export const products = [
  {
    "id": "zy-01",
    "name": "Pull Tricote",
    "code": "RZ-01",
    "price": 32,
    "category": "pulls",
    "image": "/assets/boutique/Instagram.jpg",
    "color": "Tricot R.Zayane",
    "tag": "Nouveau",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-02",
    "name": "Cardigan Femme",
    "code": "RZ-02",
    "price": 38,
    "category": "cardigans",
    "image": "/assets/boutique/cardigan_femme_1.jpg",
    "color": "Selection R.Zayane",
    "tag": "Nouveau",
    "description": "Cardigan doux et structurant pour superposer avec style."
  },
  {
    "id": "zy-03",
    "name": "Cardigan Femme",
    "code": "RZ-03",
    "price": 42,
    "category": "cardigans",
    "image": "/assets/boutique/cardigan_femme_2.jpg",
    "color": "Selection R.Zayane",
    "tag": "Nouveau",
    "description": "Cardigan doux et structurant pour superposer avec style."
  },
  {
    "id": "zy-04",
    "name": "Cardigan Femme",
    "code": "RZ-04",
    "price": 45,
    "category": "cardigans",
    "image": "/assets/boutique/cardigan_femme_3.jpg",
    "color": "Selection R.Zayane",
    "tag": "Nouveau",
    "description": "Cardigan doux et structurant pour superposer avec style."
  },
  {
    "id": "zy-05",
    "name": "Cardigan Femme",
    "code": "RZ-05",
    "price": 49,
    "category": "cardigans",
    "image": "/assets/boutique/cardigan_femme_4.jpg",
    "color": "Selection R.Zayane",
    "tag": "Nouveau",
    "description": "Cardigan doux et structurant pour superposer avec style."
  },
  {
    "id": "zy-06",
    "name": "Chemise Pagne",
    "code": "RZ-06",
    "price": 55,
    "category": "chemises",
    "image": "/assets/boutique/chemise_pagne_1.jpg",
    "color": "Pagne imprime",
    "tag": "Nouveau",
    "description": "Chemise expressive avec details soignes pour une allure moderne."
  },
  {
    "id": "zy-07",
    "name": "Chemise Pagne",
    "code": "RZ-07",
    "price": 32,
    "category": "chemises",
    "image": "/assets/boutique/chemise_pagne_2.jpg",
    "color": "Pagne imprime",
    "tag": "Nouveau",
    "description": "Chemise expressive avec details soignes pour une allure moderne."
  },
  {
    "id": "zy-08",
    "name": "Chemise Pagne",
    "code": "RZ-08",
    "price": 38,
    "category": "chemises",
    "image": "/assets/boutique/chemise_pagne_3.jpg",
    "color": "Pagne imprime",
    "tag": "Nouveau",
    "description": "Chemise expressive avec details soignes pour une allure moderne."
  },
  {
    "id": "zy-09",
    "name": "Chemise Pagne",
    "code": "RZ-09",
    "price": 42,
    "category": "chemises",
    "image": "/assets/boutique/chemise_pagne_4.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Chemise expressive avec details soignes pour une allure moderne."
  },
  {
    "id": "zy-10",
    "name": "Pantalon Femme",
    "code": "RZ-10",
    "price": 45,
    "category": "pantalons",
    "image": "/assets/boutique/pantalon_femme_1.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pantalon confortable et facile a associer avec vos pieces preferees."
  },
  {
    "id": "zy-11",
    "name": "Pantalon Femme",
    "code": "RZ-11",
    "price": 49,
    "category": "pantalons",
    "image": "/assets/boutique/pantalon_femme_2.jpg",
    "color": "Selection R.Zayane",
    "tag": "Signature",
    "description": "Pantalon confortable et facile a associer avec vos pieces preferees."
  },
  {
    "id": "zy-12",
    "name": "Pantalon Femme",
    "code": "RZ-12",
    "price": 55,
    "category": "pantalons",
    "image": "/assets/boutique/pantalon_femme_3.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pantalon confortable et facile a associer avec vos pieces preferees."
  },
  {
    "id": "zy-13",
    "name": "Pantalon Femme Tricoter",
    "code": "RZ-13",
    "price": 32,
    "category": "pantalons",
    "image": "/assets/boutique/pantalon_femme_tricotter_1.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pantalon confortable et facile a associer avec vos pieces preferees."
  },
  {
    "id": "zy-14",
    "name": "Pantalon Femme Tricoter",
    "code": "RZ-14",
    "price": 38,
    "category": "pantalons",
    "image": "/assets/boutique/pantalon_femme_tricotter_2.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pantalon confortable et facile a associer avec vos pieces preferees."
  },
  {
    "id": "zy-15",
    "name": "Pantalon Femme Tricoter",
    "code": "RZ-15",
    "price": 42,
    "category": "pantalons",
    "image": "/assets/boutique/pantalon_femme_tricotter_3.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pantalon confortable et facile a associer avec vos pieces preferees."
  },
  {
    "id": "zy-16",
    "name": "Pantalon Femme",
    "code": "RZ-16",
    "price": 45,
    "category": "pantalons",
    "image": "/assets/boutique/pantalon_femmer_4.jpg",
    "color": "Selection R.Zayane",
    "tag": "Signature",
    "description": "Pantalon confortable et facile a associer avec vos pieces preferees."
  },
  {
    "id": "zy-17",
    "name": "Poncho",
    "code": "RZ-17",
    "price": 49,
    "category": "ponchos",
    "image": "/assets/boutique/poncho.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Poncho remarquable pour completer une tenue avec caractere."
  },
  {
    "id": "zy-18",
    "name": "Pull Tricote",
    "code": "RZ-18",
    "price": 55,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_1.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-19",
    "name": "Pull Tricote",
    "code": "RZ-19",
    "price": 32,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_2.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-20",
    "name": "Pull Tricote",
    "code": "RZ-20",
    "price": 38,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_3.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-21",
    "name": "Pull Tricote",
    "code": "RZ-21",
    "price": 42,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_4.jpg",
    "color": "Selection R.Zayane",
    "tag": "Signature",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-22",
    "name": "Pull Tricote",
    "code": "RZ-22",
    "price": 45,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_5.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-23",
    "name": "Pull Tricote",
    "code": "RZ-23",
    "price": 49,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_6.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-24",
    "name": "Pull Tricote",
    "code": "RZ-24",
    "price": 55,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_7.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-25",
    "name": "Pull Tricote Femme",
    "code": "RZ-25",
    "price": 32,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_femme_1.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-26",
    "name": "Pull Tricote Femme",
    "code": "RZ-26",
    "price": 38,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_femme_2.jpg",
    "color": "Selection R.Zayane",
    "tag": "Signature",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-27",
    "name": "Pull Tricote Femme",
    "code": "RZ-27",
    "price": 42,
    "category": "pulls",
    "image": "/assets/boutique/pull_tricotte_femme_3.jpg",
    "color": "Selection R.Zayane",
    "tag": "Collection",
    "description": "Pull tricote chaud, pratique et soigne pour le quotidien."
  },
  {
    "id": "zy-28",
    "name": "Robe Pagne",
    "code": "RZ-28",
    "price": 45,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_1.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-29",
    "name": "Robe Pagne",
    "code": "RZ-29",
    "price": 49,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_2.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-30",
    "name": "Robe Pagne",
    "code": "RZ-30",
    "price": 55,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_4.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-31",
    "name": "Robe Pagne",
    "code": "RZ-31",
    "price": 32,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_5.jpg",
    "color": "Pagne imprime",
    "tag": "Signature",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-32",
    "name": "Robe Pagne",
    "code": "RZ-32",
    "price": 38,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_6.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-33",
    "name": "Robe Pagne",
    "code": "RZ-33",
    "price": 42,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_7.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-34",
    "name": "Robe Pagne",
    "code": "RZ-34",
    "price": 45,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_8.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-35",
    "name": "Robe Pagne",
    "code": "RZ-35",
    "price": 49,
    "category": "robes",
    "image": "/assets/boutique/robe_pagne_9.jpg",
    "color": "Pagne imprime",
    "tag": "Collection",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  },
  {
    "id": "zy-36",
    "name": "Robe Tricoter",
    "code": "RZ-36",
    "price": 55,
    "category": "robes",
    "image": "/assets/boutique/robe_tricotter.jpg",
    "color": "Pagne imprime",
    "tag": "Signature",
    "description": "Piece forte en pagne ou tricot, pensee pour une silhouette elegante."
  }
];


