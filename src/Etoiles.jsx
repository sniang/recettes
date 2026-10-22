import { textes } from './i18n.js'

export default function Etoiles({ n, langue }) {
  return (
    <span className="etoiles" title={textes(langue).etoiles(n)}>
      {'★'.repeat(n)}
    </span>
  )
}
