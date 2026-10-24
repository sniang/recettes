# Recettes de la famille Bergogne

Le livre de cuisine de J.-C. Bergogne et M. Nasse : 207 recettes avec leurs photos.

Site : https://sniang.github.io/recettes/

## Contenu du dépôt

- `livre/` : le livre complet (`Le livre de cuisine.pdf` et `.docx`), chaque recette dans son propre
  fichier Word (`Recettes (une par fichier)/`), et la liste des corrections apportées aux originaux.
- `src/` : le site (Vite + React), en français (par défaut), anglais et italien. Les recettes sont
  dans `src/data/recettes.json`, leurs traductions dans `recettes.en.json` et `recettes.it.json`
  (mêmes `slug`), et les textes de l'interface dans `src/i18n.js`. Adresses : `#/recette/…` en
  français, `#/en/recette/…` et `#/it/recette/…` dans les autres langues.
- `public/photos/` : les photos des plats en taille web (et en miniature dans `mini/`).
- `scripts/prepare-downloads.mjs` : copie le PDF et fabrique l'archive ZIP du dossier `livre/`
  proposés en téléchargement sur le site (dans `public/telechargements/`, non versionné).

## Ajouter ou corriger une recette

1. Modifier `src/data/recettes.json` (et les traductions `recettes.en.json` / `recettes.it.json`),
   et déposer les photos dans `public/photos/` (1000 px) et `public/photos/mini/` (420 px).
   Le dossier `nouvelles-recettes/` (non versionné) sert à déposer les fichiers reçus.
2. Regénérer le livre (PDF, Word, un fichier par recette) dans `livre/` :

```bash
python3 -m venv .venv && .venv/bin/pip install -r outils/requirements.txt
.venv/bin/python outils/livre.py
```

## Lancer le site en local

```bash
npm install
npm run dev
```

puis ouvrir http://localhost:5173/recettes/

## Publication

Chaque `git push` sur `main` construit le site et le publie sur GitHub Pages
(`.github/workflows/deploy.yml`). Dans les réglages du dépôt sur GitHub, **Settings › Pages › Source**
doit être réglé sur **GitHub Actions**.
