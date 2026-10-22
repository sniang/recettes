import infos from './data/telechargements.json'
import { textes } from './i18n.js'
import { base } from './outils.js'

export default function Telechargements({ langue, compact = false }) {
  const t = textes(langue)
  return (
    <div className={compact ? 'telechargements compact' : 'telechargements'}>
      <a className="bouton principal" href={`${base}telechargements/${infos.pdf.fichier}`} download>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
        </svg>
        {t.pdf} <span className="taille">{infos.pdf.mo} {t.mo}</span>
      </a>
      <a className="bouton" href={`${base}telechargements/${infos.zip.fichier}`} download>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
        </svg>
        {t.zip} <span className="taille">{infos.zip.mo} {t.mo}</span>
      </a>
      {!compact && <p className="aide">{t.aideZip}</p>}
    </div>
  )
}
