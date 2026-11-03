# Zépis Lil : boutique e-commerce concept

**Projet personnel de Jean Eudes.** Zépis Lil est une marque fictive (épices, vanille et thé de Maurice) créée pour montrer la conception et l'intégration d'une boutique en ligne. Ce n'est pas une commande client : produits, prix et avis sont des contenus de démonstration.

## Contenu

- `index.html` : page d'accueil (hero, best-sellers, méthode, avis de démonstration, inscription).
- `produit.html?p=vanille|the|cari|piment` : fiche produit (galerie, formats, quantité, livraison, informations).
- Panier simulé en JavaScript (`js/app.js`) : ajout, quantités, suppression, seuil de livraison offerte. Aucun paiement, aucune donnée envoyée.
- `css/tokens.css` : couleurs, espacements et mouvements du système de design personnel (clair et sombre).

## Choix

- HTML, CSS et JavaScript sans framework, pour un site léger.
- Mobile d'abord, barre d'achat collante sur mobile.
- Accessibilité : contrastes vérifiés, navigation au clavier, focus visible, panier avec focus piégé et touche Échap, textes alternatifs sur les illustrations.
- Thème clair et sombre automatique, aucune ombre.

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou `npx http-server .`
