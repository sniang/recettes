// Langues du site : le français est la langue d'origine (et par défaut), l'anglais et l'italien
// sont des traductions chargées à la demande.
export const LANGUES = ['fr', 'en', 'it']
export const NOMS_LANGUES = { fr: 'Français', en: 'English', it: 'Italiano' }

const TEXTES = {
  fr: {
    surtitre: 'Le livre de cuisine',
    titreSite: 'Recettes de la famille Bergogne',
    pdf: 'Livre en PDF',
    zip: 'Tout le dossier en ZIP',
    aideZip: 'Le ZIP contient le livre en PDF et en Word, et chaque recette dans son propre fichier Word.',
    rechercher: 'Rechercher une recette',
    exempleRecherche: 'Rechercher : lotte, pommes, crème…',
    tout: 'Tout',
    categories: 'Catégories',
    aucune: (q) => `Aucune recette ne correspond à « ${q} ».`,
    note: 'Les températures et les temps de cuisson peuvent varier en fonction du type ou de la marque des cuisinières !',
    retour: 'Toutes les recettes',
    ingredients: 'Ingrédients',
    preparation: 'Préparation',
    notes: 'Notes',
    imprimer: 'Imprimer cette recette',
    precedente: '← Précédente',
    suivante: 'Suivante →',
    navigation: 'Recette précédente et suivante',
    illustration: 'Photo d’illustration',
    photo: 'Photo',
    etoiles: (n) => `Appréciation de l'auteur : ${n} étoile${n > 1 ? 's' : ''}`,
    chargement: 'Chargement…',
    langue: 'Langue',
    mo: 'Mo',
  },
  en: {
    surtitre: 'The family cookbook',
    titreSite: 'The Bergogne family recipes',
    pdf: 'Book as PDF (in French)',
    zip: 'Whole folder as ZIP (in French)',
    aideZip: 'The ZIP contains the book as PDF and Word, and each recipe in its own Word file — all in French.',
    rechercher: 'Search for a recipe',
    exempleRecherche: 'Search: monkfish, apples, cream…',
    tout: 'All',
    categories: 'Categories',
    aucune: (q) => `No recipe matches “${q}”.`,
    note: 'Temperatures and cooking times may vary depending on the type or brand of your oven!',
    retour: 'All recipes',
    ingredients: 'Ingredients',
    preparation: 'Method',
    notes: 'Notes',
    imprimer: 'Print this recipe',
    precedente: '← Previous',
    suivante: 'Next →',
    navigation: 'Previous and next recipe',
    illustration: 'Illustration photo',
    photo: 'Photo',
    etoiles: (n) => `Author's rating: ${n} star${n > 1 ? 's' : ''}`,
    chargement: 'Loading…',
    langue: 'Language',
    mo: 'MB',
  },
  it: {
    surtitre: 'Il ricettario di famiglia',
    titreSite: 'Le ricette della famiglia Bergogne',
    pdf: 'Libro in PDF (in francese)',
    zip: 'Cartella completa in ZIP (in francese)',
    aideZip: 'Lo ZIP contiene il libro in PDF e Word e ogni ricetta in un file Word separato, tutto in francese.',
    rechercher: 'Cerca una ricetta',
    exempleRecherche: 'Cerca: rana pescatrice, mele, panna…',
    tout: 'Tutte',
    categories: 'Categorie',
    aucune: (q) => `Nessuna ricetta corrisponde a «${q}».`,
    note: 'Le temperature e i tempi di cottura possono variare a seconda del tipo o della marca del forno!',
    retour: 'Tutte le ricette',
    ingredients: 'Ingredienti',
    preparation: 'Preparazione',
    notes: 'Note',
    imprimer: 'Stampa questa ricetta',
    precedente: '← Precedente',
    suivante: 'Successiva →',
    navigation: 'Ricetta precedente e successiva',
    illustration: 'Foto illustrativa',
    photo: 'Foto',
    etoiles: (n) => `Valutazione dell'autore: ${n} stell${n > 1 ? 'e' : 'a'}`,
    chargement: 'Caricamento…',
    langue: 'Lingua',
    mo: 'MB',
  },
}

// Catégories et groupes : les clés restent en français (ce sont celles des données).
const LIBELLES = {
  en: {
    Bases: 'Basics',
    'Desserts et gourmandises': 'Desserts & treats',
    'Entrées, légumes et gratins': 'Starters, vegetables & gratins',
    Viandes: 'Meat',
    'Poissons et fruits de mer': 'Fish & seafood',
    Agneau: 'Lamb', Anguille: 'Eel', Autres: 'Other', Autruche: 'Ostrich', Bar: 'Sea bass', Boissons: 'Drinks',
    Bœuf: 'Beef', Cabillaud: 'Cod', Canard: 'Duck', 'Clafoutis et flans': 'Clafoutis & flans', Colin: 'Hake',
    Coq: 'Rooster', Crustacés: 'Shellfish', Dinde: 'Turkey', Dorade: 'Sea bream', Encornets: 'Squid',
    Espadon: 'Swordfish', Flétan: 'Halibut', Fruits: 'Fruit', Gratins: 'Gratins', Gâteaux: 'Cakes',
    Haddock: 'Haddock', Lapin: 'Rabbit', Lotte: 'Monkfish', Légumes: 'Vegetables', Maquereau: 'Mackerel',
    Morue: 'Salt cod', Moules: 'Mussels', Pintade: 'Guinea fowl', 'Plats au fromage': 'Cheese dishes',
    'Poisson blanc': 'White fish', Porc: 'Pork', Poulet: 'Chicken', Pâtes: 'Pastry', Raie: 'Skate',
    'Saint-Jacques': 'Scallops', Saumon: 'Salmon', Saumonette: 'Dogfish', Tartes: 'Tarts',
    'Tartes, tourtes et quiches': 'Tarts, pies & quiches', Thon: 'Tuna', Truite: 'Trout', Turbot: 'Turbot',
    Veau: 'Veal', 'Œufs et soupes': 'Eggs & soups',
  },
  it: {
    Bases: 'Basi',
    'Desserts et gourmandises': 'Dolci e golosità',
    'Entrées, légumes et gratins': 'Antipasti, verdure e gratin',
    Viandes: 'Carne',
    'Poissons et fruits de mer': 'Pesce e frutti di mare',
    Agneau: 'Agnello', Anguille: 'Anguilla', Autres: 'Altro', Autruche: 'Struzzo', Bar: 'Spigola', Boissons: 'Bevande',
    Bœuf: 'Manzo', Cabillaud: 'Merluzzo', Canard: 'Anatra', 'Clafoutis et flans': 'Clafoutis e flan', Colin: 'Nasello',
    Coq: 'Gallo', Crustacés: 'Crostacei', Dinde: 'Tacchino', Dorade: 'Orata', Encornets: 'Calamari',
    Espadon: 'Pesce spada', Flétan: 'Halibut', Fruits: 'Frutta', Gratins: 'Gratin', Gâteaux: 'Torte',
    Haddock: 'Eglefino', Lapin: 'Coniglio', Lotte: 'Rana pescatrice', Légumes: 'Verdure', Maquereau: 'Sgombro',
    Morue: 'Baccalà', Moules: 'Cozze', Pintade: 'Faraona', 'Plats au fromage': 'Piatti al formaggio',
    'Poisson blanc': 'Pesce bianco', Porc: 'Maiale', Poulet: 'Pollo', Pâtes: 'Impasti', Raie: 'Razza',
    'Saint-Jacques': 'Capesante', Saumon: 'Salmone', Saumonette: 'Gattuccio', Tartes: 'Crostate',
    'Tartes, tourtes et quiches': 'Crostate, torte salate e quiche', Thon: 'Tonno', Truite: 'Trota', Turbot: 'Rombo',
    Veau: 'Vitello', 'Œufs et soupes': 'Uova e zuppe',
  },
}

export const textes = (langue) => TEXTES[langue] || TEXTES.fr
export const libelle = (langue, cle) => (cle && LIBELLES[langue]?.[cle]) || cle

// Traductions des recettes, chargées seulement quand on change de langue.
const chargeurs = {
  en: () => import('./data/recettes.en.json'),
  it: () => import('./data/recettes.it.json'),
}

export async function chargerTraductions(langue) {
  if (!chargeurs[langue]) return null
  const module = await chargeurs[langue]()
  return module.default
}

/** Adresse d'une page : « #/ » ou « #/recette/slug », précédée de « /en » ou « /it » hors français. */
export function lien(langue, slug) {
  const prefixe = langue === 'fr' ? '#' : `#/${langue}`
  return slug ? `${prefixe}/recette/${slug}` : `${prefixe}/`
}
