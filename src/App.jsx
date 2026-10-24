import { useEffect, useMemo, useState } from 'react'
import Accueil from './Accueil.jsx'
import PageRecette from './PageRecette.jsx'
import { LANGUES, chargerTraductions, textes } from './i18n.js'
import { creerIndex, recettesFr, traduire } from './outils.js'

// Adresses : « #/recette/slug » en français, « #/en/recette/slug » ou « #/it/recette/slug » sinon.
// La navigation par « # » fonctionne sur GitHub Pages sans configuration serveur.
function lireRoute() {
  const m = window.location.hash.match(/^#\/(?:(en|it)(?:\/|$))?(?:recette\/([^?/]+))?/)
  const langue = m?.[1] && LANGUES.includes(m[1]) ? m[1] : 'fr'
  const brut = m?.[2] ? decodeURIComponent(m[2]) : null
  const slug = ANCIENS_SLUGS[brut] || brut
  return { langue, slug }
}

// Anciennes adresses de recettes renommées, pour que les liens déjà partagés marchent encore.
const ANCIENS_SLUGS = { 'gratin-de-raie': 'joues-de-raie-en-gratin' }

const cache = { fr: recettesFr }

export default function App() {
  const [route, setRoute] = useState(lireRoute)
  const [, setCharge] = useState(0)
  const { langue, slug } = route

  useEffect(() => {
    const surChangement = () => setRoute(lireRoute())
    window.addEventListener('hashchange', surChangement)
    return () => window.removeEventListener('hashchange', surChangement)
  }, [])

  useEffect(() => {
    document.documentElement.lang = langue
    if (cache[langue]) return
    let actif = true
    chargerTraductions(langue).then((t) => {
      cache[langue] = traduire(t)
      if (actif) setCharge((n) => n + 1)
    })
    return () => {
      actif = false
    }
  }, [langue])

  const recettes = cache[langue]
  const index = useMemo(() => (recettes ? creerIndex(recettes, langue) : null), [recettes, langue])
  const recette = recettes && slug ? recettes.find((r) => r.slug === slug) : null
  const t = textes(langue)

  useEffect(() => {
    document.title = recette ? `${recette.titre} · ${t.titreSite}` : t.titreSite
    if (recette) window.scrollTo(0, 0)
  }, [recette, t])

  if (!recettes) return <p className="chargement">{t.chargement}</p>
  return recette ? (
    <PageRecette recette={recette} recettes={recettes} langue={langue} />
  ) : (
    <Accueil recettes={recettes} index={index} langue={langue} />
  )
}
