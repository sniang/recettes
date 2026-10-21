import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Etoiles from './Etoiles.jsx'
import Telechargements from './Telechargements.jsx'
import { categories, correspond, miniature, recettes, regrouper } from './outils.js'

// La recherche, le filtre et la position dans la page sont gardés quand on revient d'une recette.
const memoire = {
  lire(cle, defaut) {
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
      /* stockage indisponible : sans importance */
    }
  },
}

export default function Accueil() {
  const [recherche, setRecherche] = useState(() => memoire.lire('recherche', ''))
  const [filtre, setFiltre] = useState(() => memoire.lire('filtre', ''))

  useEffect(() => memoire.ecrire('recherche', recherche), [recherche])
  useEffect(() => memoire.ecrire('filtre', filtre), [filtre])

  useLayoutEffect(() => {
    window.scrollTo(0, Number(memoire.lire('defilement', 0)))
    const garder = () => memoire.ecrire('defilement', String(window.scrollY))
    window.addEventListener('scroll', garder, { passive: true })
    return () => window.removeEventListener('scroll', garder)
  }, [])

  const resultats = useMemo(
    () => recettes.filter((r) => (!filtre || r.categorie === filtre) && correspond(r, recherche)),
    [recherche, filtre],
  )
  const sections = useMemo(() => regrouper(resultats), [resultats])

  return (
    <>
      <header className="entete">
        <div className="entete-contenu">
          <p className="surtitre">Le livre de cuisine</p>
          <h1>Recettes de la famille Bergogne</h1>
          <Telechargements />
        </div>
      </header>

      <main className="page">
        <div className="outils">
          <label className="recherche">
            <span className="visuellement-cache">Rechercher une recette</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher : lotte, pommes, crème…"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </label>
          <div className="filtres" role="group" aria-label="Catégories">
            <button className={!filtre ? 'actif' : ''} onClick={() => setFiltre('')}>
              Tout
            </button>
            {categories.map((c) => (
              <button key={c} className={filtre === c ? 'actif' : ''} onClick={() => setFiltre(filtre === c ? '' : c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {resultats.length === 0 && (
          <p className="vide">Aucune recette ne correspond à « {recherche} ».</p>
        )}

        {sections.map(({ categorie, groupes }) => (
          <section key={categorie} className="categorie">
            <h2>
              {categorie} <span className="compte">{groupes.reduce((n, g) => n + g.items.length, 0)}</span>
            </h2>
            {groupes.map(({ groupe, items }) => (
              <div key={groupe} className="groupe">
                {groupes.length > 1 && <h3>{groupe}</h3>}
                <ul className="grille">
                  {items.map((r) => (
                    <li key={r.slug}>
                      <a className="carte" href={`#/recette/${r.slug}`}>
                        <div className="carte-image">
                          {r.photos[0] ? (
                            <img src={miniature(r.photos[0].src)} alt="" loading="lazy" />
                          ) : (
                            <span className="sans-photo" aria-hidden="true">
                              {r.titre.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="carte-texte">
                          <span className="carte-titre">{r.titre}</span>
                          {r.etoiles > 0 && <Etoiles n={r.etoiles} />}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>

      <footer className="pied">
        <p>Les températures et les temps de cuisson peuvent varier en fonction du type ou de la marque des cuisinières !</p>
      </footer>
    </>
  )
}
