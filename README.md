# Apprentissage du Français - 3 ans (Québec) 👶🇫🇷

Plateforme interactive web d'apprentissage du français québécois conçue spécifiquement pour les tout-petits de **2.5 à 3.5 ans (30–42 mois)**, avec suivi orthophonique et parental basé sur l'**Inventaire MacArthur-Bates (CDI Québec - Mots et Énoncés)**.

---

## 🌟 Caractéristiques Principales

### 1. Interface Tout-Petits (0-Texte & Touch-First)
* **Zéro Texte :** Aucun mot écrit dans l'interface enfant; navigation 100% visuelle, tactile et intuitive.
* **4 Modules d'Apprentissage :**
  1. 🏠 **Scène Exploratoire :** 4 pièces interactives (Salon, Cuisine, Cour/Jardin, Chambre). Tap sur les objets -> rebond physique, sons, et prononciation québécoise instantanée.
  2. 🎁 **Boîte à Sons & Devine-qui :** Écran de coucou avec rideaux. Son/onomatopée d'animal ou de véhicule d'abord -> tap pour ouvrir -> révélation et confettis.
  3. 🧩 **Le Bâtisseur de Phrases :** Assemblage visuel de tuiles pour passer du Niveau 1 (Télégraphique : *Auto papa*) au Niveau 2 (Syntaxique : *Auto à papa*).
  4. 🤸 **Simon a dit / Action-Réaction :** Parties du corps (*Touche le nez !*) et verbes d'action (*Saute !*, *Dors !*) sur un avatar réactif.
* **Audio Instantané (< 16ms) :** Synthétiseur procédural Web Audio API (bulles, harpes, ressorts, confettis) couplé à la synthèse vocale en français québécois (`fr-CA`).

### 2. Portail Parents & Orthophonie (Verrouillé 2.0s)
* **Verrou de Sécurité Parentale :** Appui long de 2 secondes avec jauge radiale SVG pour éviter toute sortie accidentelle de l'enfant.
* **Tableau de Bord CDI :** Suivi des **664 mots** répartis dans les **21 catégories normatives** et des **48 repères syntaxiques**.
* **Dictionnaire Trilingue :** Recherche en français, anglais, chinois avec phonétique IPA et bouton d'écoute audio.
* **Bilan Imprimable & Export :** Fiche d'évaluation prête pour impression (PDF) pour les orthophonistes et éducateurs en CPE, export/import JSON.

---

## 🚀 Lancement Local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement local
npm run dev

# 3. Compiler pour la production
npm run build
```

---

## 🌐 Déploiement sur GitHub Pages (`github.io`)

L'application est **100% compatible GitHub Pages** car elle s'exécute entièrement dans le navigateur sans nécessiter de serveur backend.

### Méthode 1 : Déploiement Automatique via GitHub Actions (Recommandé)
1. Créez un nouveau dépôt sur GitHub (ex: `baobao` ou `french-toddler`).
2. Dans votre terminal :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<VOTRE-NOM-UTILISATEUR>/<NOM-DU-DEPOT>.git
   git push -u origin main
   ```
3. Sur GitHub, rendez-vous dans :
   **Settings** > **Pages** > sous **Build and deployment / Source**, sélectionnez **GitHub Actions**.
4. Le workflow inclus [deploy.yml](.github/workflows/deploy.yml) compilera et publiera automatiquement le site sur :
   `https://<VOTRE-NOM-UTILISATEUR>.github.io/<NOM-DU-DEPOT>/`

---

## 📚 Base de Données Linguistique

* **Mots de vocabulaire :** 664 mots québécois complets avec équivalents anglais et chinois.
* **Catégories CDI (21) :** Sons, Animaux, Véhicules, Jouets, Nourriture, Vêtements, Corps, Objets ménagers, Pièces, Extérieur, Lieux, Gens, Routines, Verbes, Descriptifs, Temps, Pronoms, Questions, Prépositions, Quantificateurs, Conjonctions.
* **Repères syntaxiques (48) :** 37 paires de complexité (Section C) + 11 paires de formes d'expression (Section D).
