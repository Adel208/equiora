# Guide de Déploiement - Equiora

## 🚀 Options de Déploiement

### 1. Netlify (Recommandé)

**Déploiement automatique depuis Git :**
1. Connectez votre repository GitHub/GitLab
2. Netlify détectera automatiquement la configuration (`netlify.toml`)
3. Le site sera déployé automatiquement à chaque push

**Déploiement manuel :**
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter à Netlify
netlify login

# Déployer le site
netlify deploy --prod --dir .
```

### 2. Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

### 3. GitHub Pages

1. Activez GitHub Pages dans les paramètres du repository
2. Sélectionnez la branche `main` comme source
3. Le site sera disponible sur `https://username.github.io/repository-name`

### 4. Serveur Traditionnel

**Apache/Nginx :**
1. Uploadez tous les fichiers dans le dossier web
2. Configurez le serveur pour servir les fichiers statiques
3. Activez la compression Gzip
4. Configurez les headers de cache

## 📋 Checklist Pré-Déploiement

### Assets Requis
- [ ] Vidéo hero : `assets/videos/hero-horse.mp4`
- [ ] Images hero pour chaque page
- [ ] Images des services (6 images)
- [ ] Photos des témoignages (3 images)
- [ ] Images détaillées des services
- [ ] Favicon et icônes PWA

### Configuration
- [ ] Vérifier les URLs dans `sitemap.xml`
- [ ] Mettre à jour les métadonnées Open Graph
- [ ] Configurer les redirections dans `netlify.toml`
- [ ] Tester le formulaire de contact
- [ ] Vérifier la carte interactive

### Performance
- [ ] Optimiser les images (WebP recommandé)
- [ ] Minifier CSS/JS si nécessaire
- [ ] Tester la vitesse de chargement
- [ ] Vérifier la compatibilité mobile

## 🔧 Configuration Serveur

### Headers de Sécurité
```apache
# .htaccess pour Apache
Header always set X-Frame-Options "DENY"
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

### Cache
```apache
# Cache des assets statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType video/mp4 "access plus 1 year"
</IfModule>
```

### Compression
```apache
# Compression Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## 🌐 Configuration DNS

### Domaine Principal
```
A    @    192.0.2.1
CNAME www  your-site.netlify.app
```

### Sous-domaines (optionnel)
```
CNAME blog    blog.equiora.fr
CNAME api     api.equiora.fr
```

## 📊 Analytics et Monitoring

### Google Analytics
Ajoutez le code de suivi dans toutes les pages :
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Vérifiez la propriété du site
2. Soumettez le sitemap.xml
3. Surveillez les erreurs d'indexation

## 🔍 SEO Post-Déploiement

### Tests Recommandés
- [ ] Google PageSpeed Insights
- [ ] GTmetrix
- [ ] Lighthouse audit
- [ ] Test de compatibilité mobile
- [ ] Validation HTML/CSS

### Optimisations
- [ ] Structured data (Schema.org)
- [ ] Balises meta optimisées
- [ ] Images avec alt text
- [ ] URLs conviviales
- [ ] Temps de chargement < 3s

## 🛠️ Maintenance

### Mises à jour Régulières
- Vérifier les liens brisés
- Mettre à jour les témoignages
- Actualiser les tarifs
- Optimiser les performances
- Sauvegarder régulièrement

### Monitoring
- Uptime monitoring
- Performance monitoring
- Error tracking
- Analytics review

## 📞 Support

En cas de problème :
1. Vérifiez les logs du serveur
2. Testez en local avec `./start.sh`
3. Consultez la documentation du provider
4. Vérifiez la configuration DNS

---

**Note :** Ce guide couvre les aspects techniques du déploiement. Pour les aspects métier (contenu, images, etc.), consultez le README.md principal.
