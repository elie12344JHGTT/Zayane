# R.Zayane Boutique

R.Zayane Boutique est un site e-commerce de vente de vetements developpe avec React, JavaScript et PHP.
Le site permet aux clients de consulter les collections, filtrer les articles par categorie, ajouter des produits au panier, remplir leurs informations de commande et lancer un paiement via la passerelle EasyPay.

## Fonctionnalites

- Page d'accueil responsive avec video de fond
- Catalogue de vetements avec categories
- Panier dynamique
- Formulaire de commande avec validation
- Paiement en USD ou CDF
- Paiement en ligne ou Mobile Money
- Integration EasyPay cote serveur en PHP
- Endpoint IPN pour recevoir les notifications de paiement EasyPay

## Technologies

- React
- Vite
- JavaScript
- PHP
- EasyPay API
- HTML/CSS responsive

## Configuration locale

Copier `api/.env.example` vers `api/.env`, puis renseigner les identifiants EasyPay.

```bash
npm install
npm run dev
```

L'API PHP peut etre lancee avec :

```bash
php -S 127.0.0.1:8000 -t .
```
