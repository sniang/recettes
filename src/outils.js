import donnees from './data/recettes.json'

export const { ordreGroupes, recettes } = donnees

// « Bases » (la pâte brisée seule) passe en dernier sur le site, après les plats.
export const categories = [...donnees.categories.filter((c) => c !== 'Bases'), 'Bases']

export const base = import.meta.env.BASE_URL

export const photo = (src) => `${base}photos/${src}`
export const miniature = (src) => `${base}photos/mini/${src}`

/** Texte en minuscules sans accents, pour la recherche. */
export function normaliser(texte) {
  return (texte || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .toLowerCase()
}

const indexRecherche = new Map(
  recettes.map((r) => [
    r.slug,
    normaliser(
      [r.titre, r.groupe, r.categorie, ...r.parties.flatMap((p) => p.ingredients)].join(' '),
    ),
  ]),
)

/** Une recette correspond si chaque mot recherché apparaît dans son titre, son groupe ou ses ingrédients. */
export function correspond(recette, recherche) {
  const mots = normaliser(recherche).split(/\s+/).filter(Boolean)
  const texte = indexRecherche.get(recette.slug)
  return mots.every((m) => texte.includes(m))
}

const rangGroupe = (g) => {
  const i = ordreGroupes.indexOf(g)
  return i === -1 ? 100 : i
}

/** Regroupe une liste de recettes par catégorie puis par groupe, dans l'ordre du livre. */
export function regrouper(liste) {
  return categories
    .map((categorie) => {
      const groupes = new Map()
      for (const r of liste.filter((r) => r.categorie === categorie)) {
        const g = r.groupe || 'Divers'
        if (!groupes.has(g)) groupes.set(g, [])
        groupes.get(g).push(r)
      }
      return {
        categorie,
        groupes: [...groupes.entries()]
          .sort(([a], [b]) => rangGroupe(a) - rangGroupe(b) || a.localeCompare(b, 'fr'))
          .map(([groupe, items]) => ({ groupe, items })),
      }
    })
    .filter((c) => c.groupes.length > 0)
}

/** Les recettes dans l'ordre du livre, pour la navigation précédente / suivante. */
export const ordreLivre = regrouper(recettes).flatMap((c) => c.groupes.flatMap((g) => g.items))

/** Petit stockage de session (recherche, filtre, position) : tout échec est sans conséquence. */
export const memoire = {
  lire(cle, defaut = null) {
    try {
      return sessionStorage.getItem(cle) ?? defaut
    } catch {
      return defaut
    }
  },
  ecrire(cle, valeur) {
    try {
      sessionStorage.setItem(cle, valeur)
    } catch {
      /* stockage indisponible */
    }
  },
  retirer(cle) {
    try {
      sessionStorage.removeItem(cle)
    } catch {
      /* stockage indisponible */
    }
  },
}
