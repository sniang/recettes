import infos from './data/telechargements.json'
import { base } from './outils.js'

export default function Telechargements({ compact = false }) {
  return (
    <div className={compact ? 'telechargements compact' : 'telechargements'}>
      <a className="bouton principal" href={`${base}telechargements/${infos.pdf.fichier}`} download>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
        </svg>
        Livre en PDF <span className="taille">{infos.pdf.mo} Mo</span>
      </a>
      <a className="bouton" href={`${base}telechargements/${infos.zip.fichier}`} download>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
        </svg>
        Tout le dossier en ZIP <span className="taille">{infos.zip.mo} Mo</span>
      </a>
      {!compact && (
        <p className="aide">
          Le ZIP contient le livre en PDF et en Word, et chaque recette dans son propre fichier Word.
        </p>
      )}
    </div>
  )
}
