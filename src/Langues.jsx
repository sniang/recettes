import { LANGUES, NOMS_LANGUES, lien, textes } from './i18n.js'

/** Sélecteur FR · EN · IT : renvoie vers la même page (liste ou recette) dans l'autre langue. */
export default function Langues({ langue, slug = null }) {
  return (
    <nav className="langues" aria-label={textes(langue).langue}>
      {LANGUES.map((l) => (
        <a
          key={l}
          href={lien(l, slug)}
          hrefLang={l}
          lang={l}
          title={NOMS_LANGUES[l]}
          aria-current={l === langue ? 'true' : undefined}
          className={l === langue ? 'actif' : ''}
          onClick={(e) => {
            // Changer de langue remplace la page courante dans l'historique au lieu d'en ajouter une.
            e.preventDefault()
            window.location.replace(lien(l, slug))
          }}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </nav>
  )
}
