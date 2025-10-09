# Equiora - Site Web de Soins Équins

Un site web moderne et immersif pour un praticien en soins équins naturels, avec des animations GSAP sophistiquées et une expérience utilisateur premium.

## 🌟 Fonctionnalités

### 🏠 Page d'Accueil
- **Hero Section Vidéo** : Vidéo en arrière-plan avec overlay dégradé
- **Animations GSAP** : Animations fluides au scroll et au hover
- **Carrousel de Services** : Présentation interactive des services
- **Témoignages Clients** : Slider avec transitions douces
- **Section Aperçu** : Introduction à l'approche du praticien

### 🎯 Page Mon Approche
- **Philosophie Animée** : Points clés avec animations au scroll
- **Diagramme Circulaire** : Visualisation interactive des services
- **Timeline de Processus** : 4 étapes avec animations séquentielles
- **Statistiques Animées** : Compteurs avec effets visuels
- **Expérience Professionnelle** : Timeline chronologique

### 🛠️ Page Services
- **Filtres Dynamiques** : Catégorisation des services (Thérapeutique, Bien-être, Préventif)
- **Cartes Détaillées** : Informations complètes avec animations hover
- **Modals Interactifs** : Détails approfondis pour chaque service
- **Section Tarifs** : Grille de prix avec plan populaire mis en avant
- **FAQ Accordéon** : Questions fréquentes avec animations

### 📞 Page Contact
- **Formulaire Avancé** : Validation temps réel et micro-interactions
- **Carte Interactive** : Zones d'intervention avec Leaflet.js
- **Auto-complétion** : Suggestions pour les adresses
- **États de Soumission** : Loading, succès, erreur
- **Section Urgences** : Contact direct pour les cas urgents

## 🎨 Design & Animations

### Palette de Couleurs
- **Primaire** : `#2c5530` (Vert forêt)
- **Secondaire** : `#8b4513` (Brun naturel)
- **Accent** : `#d4af37` (Or)
- **Texte** : `#2c3e50` (Gris foncé)

### Animations GSAP
- **ScrollTrigger** : Animations déclenchées au scroll
- **Stagger Effects** : Animations séquentielles
- **Hover Interactions** : Effets au survol
- **Loading States** : Animations de chargement
- **Parallax Effects** : Effets de parallaxe subtils

### Responsive Design
- **Mobile First** : Optimisé pour tous les écrans
- **Navigation Mobile** : Menu hamburger animé
- **Grilles Adaptatives** : Layout flexible
- **Touch Interactions** : Gestes tactiles fluides

## 🚀 Technologies Utilisées

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS
- **JavaScript ES6+** : Logique interactive
- **GSAP 3.12** : Animations professionnelles
- **Leaflet.js** : Cartes interactives

### Fonctionnalités Avancées
- **Intersection Observer** : Détection de visibilité
- **Form Validation** : Validation côté client
- **Local Storage** : Persistance des données
- **Service Workers** : Cache et performance

## 📁 Structure du Projet

```
Equiora/
├── index.html              # Page d'accueil
├── approche.html           # Page Mon Approche
├── services.html           # Page Services
├── contact.html            # Page Contact
├── css/
│   ├── style.css          # Styles globaux
│   ├── approche.css       # Styles page Approche
│   ├── services.css       # Styles page Services
│   └── contact.css        # Styles page Contact
├── js/
│   ├── main.js            # JavaScript principal
│   ├── approche.js        # Scripts page Approche
│   ├── services.js        # Scripts page Services
│   └── contact.js         # Scripts page Contact
├── assets/
│   ├── images/            # Images du site
│   └── videos/            # Vidéos (hero background)
└── README.md              # Documentation
```

## 🎯 Pages et Sections

### 1. Page d'Accueil (index.html)
- Hero avec vidéo background
- Services en carrousel
- Témoignages clients
- Aperçu de l'approche
- Footer complet

### 2. Mon Approche (approche.html)
- Philosophie avec points clés
- Diagramme circulaire interactif
- Processus en 4 étapes
- Bienfaits avec statistiques
- Expérience professionnelle

### 3. Services (services.html)
- Filtres par catégorie
- 6 services détaillés
- Modals informatifs
- Grille de tarifs
- FAQ interactive

### 4. Contact (contact.html)
- Informations de contact
- Formulaire complet
- Carte interactive
- FAQ contact
- Section urgences

## 🎨 Animations et Interactions

### Animations au Scroll
- **Fade In Up** : Apparition depuis le bas
- **Slide In** : Glissement latéral
- **Scale In** : Agrandissement progressif
- **Stagger** : Animations séquentielles

### Interactions Hover
- **Transform** : Translations et rotations
- **Scale** : Agrandissement au survol
- **Color Transitions** : Changements de couleur
- **Shadow Effects** : Ombres dynamiques

### Micro-interactions
- **Button States** : États des boutons
- **Form Feedback** : Validation visuelle
- **Loading States** : Indicateurs de chargement
- **Success Messages** : Confirmations animées

## 📱 Responsive Breakpoints

- **Mobile** : < 480px
- **Tablet** : 481px - 768px
- **Desktop** : 769px - 1024px
- **Large Desktop** : > 1024px

## 🔧 Installation et Utilisation

### Prérequis
- Navigateur web moderne
- Serveur local (optionnel)

### Lancement
1. Cloner ou télécharger le projet
2. Ouvrir `index.html` dans un navigateur
3. Ou utiliser un serveur local pour les fonctionnalités avancées

### Assets Requis
Pour un fonctionnement optimal, ajoutez ces images dans `assets/images/` :

**Images Hero :**
- `hero-horse.mp4` (vidéo background accueil)
- `approach-hero.jpg` (hero page approche)
- `services-hero.jpg` (hero page services)
- `contact-hero.jpg` (hero page contact)

**Images Services :**
- `osteopathie.jpg`
- `massage.jpg`
- `phytotherapie.jpg`
- `acupuncture.jpg`
- `bilan.jpg`
- `suivi-sportif.jpg`

**Images Témoignages :**
- `client1.jpg`
- `client2.jpg`
- `client3.jpg`

**Images Détails :**
- `about-preview.jpg`
- `osteopathie-detail.jpg`
- `massage-detail.jpg`
- `phytotherapie-detail.jpg`
- `acupuncture-detail.jpg`
- `bilan-detail.jpg`
- `suivi-sportif-detail.jpg`

## 🎯 Optimisations SEO

### Balises Meta
- Titres optimisés par page
- Descriptions uniques
- Mots-clés pertinents
- Open Graph tags

### Structure HTML
- Balises sémantiques
- Hiérarchie des titres
- Alt text pour images
- Schema markup

### Performance
- Images optimisées
- CSS/JS minifiés
- Lazy loading
- Cache browser

## 🚀 Déploiement

### Options de Déploiement
1. **Hébergement statique** : Netlify, Vercel, GitHub Pages
2. **Serveur traditionnel** : Apache, Nginx
3. **CDN** : Cloudflare, AWS CloudFront

### Optimisations Production
- Compression Gzip
- Minification CSS/JS
- Optimisation images
- Cache headers

## 🔮 Fonctionnalités Futures

### Améliorations Possibles
- **Blog** : Articles sur les soins équins
- **Galerie** : Photos avant/après
- **Booking System** : Réservation en ligne
- **Client Portal** : Espace client
- **Multi-langue** : Support français/anglais

### Intégrations
- **CMS** : Gestion de contenu
- **Analytics** : Google Analytics
- **Chat** : Support client en direct
- **Newsletter** : Système d'emailing

## 📞 Support

Pour toute question ou personnalisation :
- Consultez la documentation
- Vérifiez les commentaires dans le code
- Testez sur différents navigateurs
- Optimisez les images pour la production

---

**Equiora** - Site web professionnel pour soins équins naturels
Développé avec passion pour offrir une expérience utilisateur exceptionnelle 🐎✨
