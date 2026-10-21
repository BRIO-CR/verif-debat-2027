# Vérif Débat 2027

Web app installable (PWA) pour vérifier les chiffres entendus pendant les débats de la présidentielle 2027 et comparer les propositions de six candidats.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `styles.css` | Mise en page (clair et sombre) |
| `data.js` | **Toutes les données** : chiffres officiels, propositions, sources. C'est le seul fichier à modifier pour une mise à jour. |
| `app.js` | Affichage, recherche, comparateur hors ligne, installation, partage |
| `manifest.webmanifest`, `icons/` | Nom, icône et couleurs de l'app installée |
| `sw.js` | Fonctionnement hors ligne |

Aucune dépendance, aucune étape de build : ce sont des fichiers statiques.

## Mettre en ligne (gratuit)

**Option 1 : Netlify Drop (le plus simple)**
1. Ouvrir https://app.netlify.com/drop
2. Glisser le dossier `verif-debat-2027-app` dans la page.
3. Créer un compte gratuit pour garder le site en ligne, puis renommer l'adresse (ex. `verif-debat-2027.netlify.app`).
4. Pour une mise à jour : *Deploys* → glisser à nouveau le dossier.

**Option 2 : GitHub Pages (avec Claude Code)**
Dans Claude Code, ouvert dans ce dossier, demander : « Crée un dépôt GitHub public `verif-debat-2027`, pousse ces fichiers et active GitHub Pages ». L'adresse sera `https://<ton-pseudo>.github.io/verif-debat-2027/`.

## Tester sur l'ordinateur

```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000

## Mettre à jour les données

1. Modifier `data.js` (chiffre, période, source, ou proposition d'un candidat), puis changer `DATA_DATE`.
2. Dans `sw.js`, passer `CACHE = "vd27-v1"` à `"vd27-v2"` pour que les téléphones récupèrent la nouvelle version.
3. Republier le dossier.

Prochaines publications utiles : chômage du 3ᵉ trimestre (Insee, mi-novembre), inflation d'octobre (Insee, fin octobre), détenus au 1ᵉʳ du mois (ministère de la Justice).

## Principes

- Chiffres issus de la statistique publique, avec période et source sur chaque fiche.
- Candidats classés par ordre alphabétique, présentés sous la même forme, sans couleur de parti.
- Le comparateur rapproche une phrase des données de l'app et montre les écarts ; il ne rend pas de verdict sur les candidats.
