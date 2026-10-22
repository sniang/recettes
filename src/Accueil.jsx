import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Etoiles from './Etoiles.jsx'
import Langues from './Langues.jsx'
import Telechargements from './Telechargements.jsx'
import { libelle, lien, textes } from './i18n.js'
import { categories, correspond, memoire, miniature, regrouper } from './outils.js'

export default function Accueil({ recettes, index, langue }) {
  const t = textes(langue)
  const [recherche, setRecherche] = useState(() => memoire.lire('recherche', ''))
  const [filtre, setFiltre] = useState(() => memoire.lire('filtre', ''))

  useEffect(() => memoire.ecrire('recherche', recherche), [recherche])
  useEffect(() => memoire.ecrire('filtre', filtre), [filtre])

  // En revenant d'une recette, on retrouve la liste là où on l'avait laissée (et seulement dans ce cas).
  useLayoutEffect(() => {
    const position = memoire.lire('defilement')
    if (position !== null) {
      memoire.retirer('defilement')
      window.scrollTo(0, Number(position))
    }
  }, [])
  const ouvrir = () => memoire.ecrire('defilement', String(window.scrollY))

  const resultats = useMemo(
    () => recettes.filter((r) => (!filtre || r.categorie === filtre) && correspond(index, r, recherche)),
    [recettes, index, recherche, filtre],
  )
  const sections = useMemo(() => regrouper(resultats, langue), [resultats, langue])

  return (
    <>
      <header className="entete">
        <div className="entete-contenu">
          <div className="entete-haut">
            <p className="surtitre">{t.surtitre}</p>
            <Langues langue={langue} />
          </div>
          <h1>{t.titreSite}</h1>
          <Telechargements langue={langue} />
        </div>
      </header>

      <main className="page">
        <div className="outils">
          <label className="recherche">
            <span className="visuellement-cache">{t.rechercher}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder={t.exempleRecherche}
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </label>
          <div className="filtres" role="group" aria-label={t.categories}>
            <button className={!filtre ? 'actif' : ''} onClick={() => setFiltre('')}>
              {t.tout}
            </button>
            {categories.map((c) => (
              <button key={c} className={filtre === c ? 'actif' : ''} onClick={() => setFiltre(filtre === c ? '' : c)}>
                {libelle(langue, c)}
              </button>
            ))}
          </div>
        </div>

        {resultats.length === 0 && <p className="vide">{t.aucune(recherche)}</p>}

        {sections.map(({ categorie, groupes }) => (
          <section key={categorie} className="categorie">
            <h2>
              {libelle(langue, categorie)}{' '}
              <span className="compte">{groupes.reduce((n, g) => n + g.items.length, 0)}</span>
            </h2>
            {groupes.map(({ groupe, items }) => (
              <div key={groupe} className="groupe">
                {groupes.length > 1 && <h3>{libelle(langue, groupe)}</h3>}
                <ul className="grille">
                  {items.map((r) => (
                    <li key={r.slug}>
                      <a className="carte" href={lien(langue, r.slug)} onClick={ouvrir}>
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
                          {r.etoiles > 0 && <Etoiles n={r.etoiles} langue={langue} />}
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
        <p>{t.note}</p>
      </footer>
    </>
  )
}
