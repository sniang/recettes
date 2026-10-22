import { useState } from 'react'
import Etoiles from './Etoiles.jsx'
import Langues from './Langues.jsx'
import Telechargements from './Telechargements.jsx'
import { libelle, lien, textes } from './i18n.js'
import { memoire, ordreLivre, photo } from './outils.js'

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

// « Toutes les recettes » revient en arrière quand on vient de la liste, pour que le bouton
// retour du téléphone et ce lien mènent au même endroit.
function retourListe(e) {
  if (memoire.lire('defilement') !== null && window.history.length > 1) {
    e.preventDefault()
    window.history.back()
  }
}

// Recette précédente / suivante : remplace l'entrée d'historique au lieu d'en empiler une.
function allerA(e, adresse) {
  e.preventDefault()
  window.location.replace(adresse)
}

export default function PageRecette({ recette: r, recettes, langue }) {
  const t = textes(langue)
  const ordre = ordreLivre(recettes, langue)
  const i = ordre.findIndex((x) => x.slug === r.slug)
  const prec = ordre[i - 1]
  const suiv = ordre[i + 1]
  const infos = [libelle(langue, r.groupe), r.personnes].filter(Boolean)

  return (
    <>
      <nav className="barre">
        <a href={lien(langue)} className="retour" onClick={retourListe}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          {t.retour}
        </a>
        <span className="barre-titre">{t.titreSite}</span>
        <Langues langue={langue} slug={r.slug} />
      </nav>

      <main className="page recette">
        <p className="fil">{libelle(langue, r.categorie)}</p>
        <h1>{r.titre}</h1>
        {(infos.length > 0 || r.etoiles > 0) && (
          <p className="infos">
            {infos.join(' · ')}
            {r.etoiles > 0 && <Etoiles n={r.etoiles} langue={langue} />}
          </p>
        )}

        {r.photos.length > 0 && (
          <div className={`photos n${r.photos.length}`}>
            {r.photos.map((p) => (
              <figure key={p.src}>
                <img src={photo(p.src)} width={p.w} height={p.h} alt={`${t.photo} : ${r.titre}`} />
                {p.illustration && (
                  <a className="legende" href={p.source} target="_blank" rel="noreferrer"
                    title={`${p.credit} · ${p.licence} · Wikimedia Commons`}>
                    {t.illustration}
                  </a>
                )}
              </figure>
            ))}
          </div>
        )}

        {r.intro && <p className="intro">{r.intro}</p>}

        {r.parties.map((partie, k) => (
          // La clé inclut la recette : les cases cochées repartent de zéro sur chaque recette.
          <section key={`${r.slug}-${k}`} className="partie">
            {partie.nom && <h2 className="nom-partie">{partie.nom}</h2>}
            <div className={partie.ingredients.length ? 'colonnes' : ''}>
              {partie.ingredients.length > 0 && (
                <div className="bloc-ingredients">
                  <h3>{t.ingredients}</h3>
                  <Ingredients liste={partie.ingredients} />
                </div>
              )}
              {partie.etapes.length > 0 && (
                <div>
                  <h3>{t.preparation}</h3>
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
            <h3>{t.notes}</h3>
            {r.notes.map((n, j) => (
              <p key={j}>{n}</p>
            ))}
          </section>
        )}

        <div className="actions">
          <button className="bouton" onClick={() => window.print()}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 9V4h10v5M7 17H5v-6h14v6h-2M7 14h10v6H7z" />
            </svg>
            {t.imprimer}
          </button>
        </div>

        <nav className="suite" aria-label={t.navigation}>
          {prec ? (
            <a href={lien(langue, prec.slug)} onClick={(e) => allerA(e, lien(langue, prec.slug))}>
              <span>{t.precedente}</span>
              {prec.titre}
            </a>
          ) : (
            <span />
          )}
          {suiv && (
            <a href={lien(langue, suiv.slug)} className="droite" onClick={(e) => allerA(e, lien(langue, suiv.slug))}>
              <span>{t.suivante}</span>
              {suiv.titre}
            </a>
          )}
        </nav>
      </main>

      <footer className="pied">
        <Telechargements langue={langue} compact />
      </footer>
    </>
  )
}
