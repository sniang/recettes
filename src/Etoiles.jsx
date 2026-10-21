export default function Etoiles({ n }) {
  return (
    <span className="etoiles" title={`Appréciation de l'auteur : ${n} étoile${n > 1 ? 's' : ''}`}>
      {'★'.repeat(n)}
    </span>
  )
}
