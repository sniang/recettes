import { useEffect, useState } from 'react'
import Accueil from './Accueil.jsx'
import PageRecette from './PageRecette.jsx'
import { recettes } from './outils.js'

// Navigation par « #/recette/slug » : fonctionne sur GitHub Pages sans configuration serveur.
function lireRoute() {
  const m = window.location.hash.match(/^#\/recette\/([^?]+)/)
  return m ? { page: 'recette', slug: decodeURIComponent(m[1]) } : { page: 'accueil' }
}

export default function App() {
  const [route, setRoute] = useState(lireRoute)

  useEffect(() => {
    const surChangement = () => setRoute(lireRoute())
    window.addEventListener('hashchange', surChangement)
    return () => window.removeEventListener('hashchange', surChangement)
  }, [])

  const recette = route.page === 'recette' ? recettes.find((r) => r.slug === route.slug) : null

  useEffect(() => {
    document.title = recette ? `${recette.titre} · Recettes de la famille Bergogne` : 'Recettes de la famille Bergogne'
    if (recette) window.scrollTo(0, 0)
  }, [recette])

  return recette ? <PageRecette recette={recette} /> : <Accueil />
}
