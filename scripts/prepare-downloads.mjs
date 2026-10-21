// Prépare les fichiers à télécharger depuis le site (PDF + archive zip du dossier livre/).
// Lancé automatiquement avant `npm run dev` et `npm run build`.
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const livre = join(root, 'livre')
const out = join(root, 'public', 'telechargements')
const pdfSrc = join(livre, 'Le livre de cuisine.pdf')
const pdfName = 'livre-de-cuisine-famille-bergogne.pdf'
const zipName = 'recettes-famille-bergogne.zip'
const zipFolder = 'Recettes de la famille Bergogne'

function newestMtime(dir) {
  let t = statSync(dir).mtimeMs
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    t = Math.max(t, e.isDirectory() ? newestMtime(p) : statSync(p).mtimeMs)
  }
  return t
}

mkdirSync(out, { recursive: true })

const pdfOut = join(out, pdfName)
if (!existsSync(pdfOut) || statSync(pdfOut).mtimeMs < statSync(pdfSrc).mtimeMs) {
  copyFileSync(pdfSrc, pdfOut)
}

const zipOut = join(out, zipName)
if (!existsSync(zipOut) || statSync(zipOut).mtimeMs < newestMtime(livre)) {
  // Archive faite avec Python : les noms de fichiers sont marqués UTF-8, ce qui garde les accents
  // lisibles sous Windows (l'outil `zip` de macOS ne le fait pas).
  const script = `
import os, sys, zipfile
src, dst, nom = sys.argv[1:4]
with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for dossier, _, fichiers in sorted(os.walk(src)):
        for f in sorted(fichiers):
            if f != ".DS_Store":
                p = os.path.join(dossier, f)
                z.write(p, os.path.join(nom, os.path.relpath(p, src)))
`
  execFileSync('python3', ['-c', script, livre, zipOut, zipFolder])
}

const mo = (f) => Math.round(statSync(f).size / 1e6)
writeFileSync(
  join(root, 'src', 'data', 'telechargements.json'),
  JSON.stringify({ pdf: { fichier: pdfName, mo: mo(pdfOut) }, zip: { fichier: zipName, mo: mo(zipOut) } }, null, 1),
)
console.log(`Téléchargements prêts : PDF ${mo(pdfOut)} Mo, ZIP ${mo(zipOut)} Mo`)
