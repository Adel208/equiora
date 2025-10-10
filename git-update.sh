#!/bin/bash

echo "🔄 Mise à jour du projet sur GitHub..."

# Annuler tout merge en cours
echo "📌 Vérification de l'état Git..."
git merge --abort 2>/dev/null || true

# Changer le remote vers le bon dépôt
echo "🔗 Configuration du remote GitHub..."
git remote set-url origin https://github.com/Adel208/equiora.git 2>/dev/null || git remote add origin https://github.com/Adel208/equiora.git

# Vérifier le remote
echo "✅ Remote configuré:"
git remote -v

# Pousser le code avec force (écrase le dépôt distant)
echo "⬆️  Push du code vers GitHub..."
git push -u origin main --force

echo "✨ Mise à jour terminée!"
echo "🌐 Votre projet est maintenant sur: https://github.com/Adel208/equiora"
