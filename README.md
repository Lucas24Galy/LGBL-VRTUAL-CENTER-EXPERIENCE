
# LGBL Virtual Experience Center — Site Web

Site statique prêt pour **GitHub Pages**.

## Déploiement GitHub Pages

1. Crée un nouveau dépôt GitHub (ex: `lgbl-website`).
2. Glisse-dépose **tous les fichiers** de ce dossier à la racine du dépôt.
3. Va dans **Settings → Pages** : 
   - *Build and deployment* → **Deploy from a branch**
   - *Branch* → **main** (ou `master`) / **root**
4. Ton site sera en ligne sur `https://<ton-user>.github.io/lgbl-website/`.

> Pour un domaine perso (`lgbl-experience.fr`) : configure un enregistrement DNS **CNAME** vers `username.github.io` puis dans `Settings → Pages`, ajoute le domaine personnalisé.

## Personnalisation rapide

- Remplace les images dans `assets/img/` par tes vraies photos (garde les mêmes noms de fichiers pour éviter de modifier le HTML).
- Mets à jour les liens des réseaux dans la section **Contact & Accès**.
- Ajoute ton e‑mail dans le schéma JSON‑LD (index.html).
- Mets à jour `sitemap.xml` et `robots.txt` avec l’URL finale du site.

## Édition du contenu

- Couleurs et styles : `assets/css/styles.css`
- Scripts (menu mobile, lightbox) : `assets/js/main.js`
- Structure et textes : `index.html`

## SEO

- Balises **title**, **description**, **Open Graph** déjà en place.
- **JSON‑LD LocalBusiness** configuré pour Agen (47).
- `sitemap.xml` et `robots.txt` inclus.

---

© LGBL Virtual Experience Center — 2025
