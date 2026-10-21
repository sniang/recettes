import { useState } from 'react'
import Etoiles from './Etoiles.jsx'
import Telechargements from './Telechargements.jsx'
import { ordreLivre, photo } from './outils.js'

function Ingredients({ liste }) {
  // Cases à cocher pour suivre les ingrédients déjà sortis pendant la préparation.
  const [coches, setCoches] = useState(() => new Set())
  const basculer = (i) =>
    setCoches((prec) => {
      const s = new Set(prec)
      if (s.has(i)) s.delete(i)
      else s.add(i)
      return s
    })
  return (
    <ul className="ingredients">
      {liste.map((ing, i) => (
        <li key={i}>
          <label className={coches.has(i) ? 'coche' : ''}>
            <input type="checkbox" checked={coches.has(i)} onChange={() => basculer(i)} />
            <span>{ing}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default function PageRecette({ recette: r }) {
  const i = ordreLivre.findIndex((x) => x.slug === r.slug)
  const prec = ordreLivre[i - 1]
  const suiv = ordreLivre[i + 1]
  const infos = [r.groupe, r.personnes].filter(Boolean)

  return (
    <>
      <nav className="barre">
        <a href="#/" className="retour">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          Toutes les recettes
        </a>
        <span className="barre-titre">Recettes de la famille Bergogne</span>
      </nav>

      <main className="page recette">
        <p className="fil">{r.categorie}</p>
        <h1>{r.titre}</h1>
        {(infos.length > 0 || r.etoiles > 0) && (
          <p className="infos">
            {infos.join(' · ')}
            {r.etoiles > 0 && <Etoiles n={r.etoiles} />}
          </p>
        )}

        {r.photos.length > 0 && (
          <div className={`photos n${r.photos.length}`}>
            {r.photos.map((p) => (
              <a key={p.src} href={p.illustration ? p.source : photo(p.src)} target="_blank" rel="noreferrer">
                <img src={photo(p.src)} width={p.w} height={p.h} alt={`Photo : ${r.titre}`} />
                {p.illustration && (
                  <span className="legende" title={`${p.credit} · ${p.licence} · Wikimedia Commons`}>
                    Photo d’illustration
                  </span>
                )}
              </a>
            ))}
          </div>
        )}

        {r.intro && <p className="intro">{r.intro}</p>}

        {r.parties.map((partie, k) => (
          <section key={k} className="partie">
            {partie.nom && <h2 className="nom-partie">{partie.nom}</h2>}
            <div className={partie.ingredients.length ? 'colonnes' : ''}>
              {partie.ingredients.length > 0 && (
                <div className="bloc-ingredients">
                  <h3>Ingrédients</h3>
                  <Ingredients liste={partie.ingredients} />
                </div>
              )}
              {partie.etapes.length > 0 && (
                <div>
                  <h3>Préparation</h3>
                  <ol className="etapes">
                    {partie.etapes.map((e, j) => (
                      <li key={j}>{e}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </section>
        ))}

        {r.notes.length > 0 && (
          <section className="notes">
            <h3>Notes</h3>
            {r.notes.map((n, j) => (
              <p key={j}>{n}</p>
            ))}
          </section>
        )}

        {r.coupures.length > 0 && (
          <section className="coupures">
            <h3>Coupure de magazine</h3>
            {r.coupures.map((c) => (
              <a key={c.src} href={photo(c.src)} target="_blank" rel="noreferrer">
                <img src={photo(c.src)} width={c.w} height={c.h} alt={`Coupure de magazine : ${r.titre}`} loading="lazy" />
              </a>
            ))}
          </section>
        )}

        <div className="actions">
          <button className="bouton" onClick={() => window.print()}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 9V4h10v5M7 17H5v-6h14v6h-2M7 14h10v6H7z" />
            </svg>
            Imprimer cette recette
          </button>
        </div>

        <nav className="suite" aria-label="Recette précédente et suivante">
          {prec ? (
            <a href={`#/recette/${prec.slug}`}>
              <span>← Précédente</span>
              {prec.titre}
            </a>
          ) : (
            <span />
          )}
          {suiv && (
            <a href={`#/recette/${suiv.slug}`} className="droite">
              <span>Suivante →</span>
              {suiv.titre}
            </a>
          )}
        </nav>
      </main>

      <footer className="pied">
        <Telechargements compact />
      </footer>
    </>
  )
}
