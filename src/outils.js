import donnees from './data/recettes.json'
import { libelle } from './i18n.js'

export const { ordreGroupes } = donnees
export const recettesFr = donnees.recettes

// « Bases » (la pâte brisée seule) passe en dernier sur le site, après les plats.
export const categories = [...donnees.categories.filter((c) => c !== 'Bases'), 'Bases']

export const base = import.meta.env.BASE_URL

export const photo = (src) => `${base}photos/${src}`
export const miniature = (src) => `${base}photos/mini/${src}`

/** Recettes dans une langue : le texte traduit remplace le texte français, le reste ne change pas. */
export function traduire(traductions) {
  if (!traductions) return recettesFr
  return recettesFr.map((r) => ({ ...r, ...traductions[r.slug] }))
}

/** Texte en minuscules sans accents, pour la recherche. */
export function normaliser(texte) {
  return (texte || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .toLowerCase()
}

/** Index de recherche : titre, groupe, catégorie et ingrédients, dans la langue affichée. */
export function creerIndex(liste, langue) {
  return new Map(
    liste.map((r) => [
      r.slug,
      normaliser(
        [r.titre, libelle(langue, r.groupe), libelle(langue, r.categorie), ...r.parties.flatMap((p) => p.ingredients)].join(' '),
      ),
    ]),
  )
}

/** Une recette correspond si chaque mot recherché apparaît dans son texte indexé. */
export function correspond(index, recette, recherche) {
  const mots = normaliser(recherche).split(/\s+/).filter(Boolean)
  const texte = index.get(recette.slug) || ''
  return mots.every((m) => texte.includes(m))
}

const rangGroupe = (g) => {
  const i = ordreGroupes.indexOf(g)
  return i === -1 ? 100 : i
}

/** Regroupe les recettes par catégorie puis par groupe, triées dans la langue affichée. */
export function regrouper(liste, langue) {
  const comparer = (a, b) => a.localeCompare(b, langue, { sensitivity: 'base' })
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
          .sort(([a], [b]) => rangGroupe(a) - rangGroupe(b) || comparer(libelle(langue, a), libelle(langue, b)))
          .map(([groupe, items]) => ({ groupe, items: [...items].sort((x, y) => comparer(x.titre, y.titre)) })),
      }
    })
    .filter((c) => c.groupes.length > 0)
}

/** Les recettes dans l'ordre affiché, pour la navigation précédente / suivante. */
export const ordreLivre = (liste, langue) =>
  regrouper(liste, langue).flatMap((c) => c.groupes.flatMap((g) => g.items))

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
