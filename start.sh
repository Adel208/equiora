#!/bin/bash

# Script de démarrage pour le site Equiora
echo "🐎 Démarrage du site Equiora..."

# Vérifier si Python est installé
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 détecté"
    echo "🚀 Démarrage du serveur sur http://localhost:8000"
    echo "📝 Ouvrez demo.html pour voir la page de démonstration"
    echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python détecté"
    echo "🚀 Démarrage du serveur sur http://localhost:8000"
    echo "📝 Ouvrez demo.html pour voir la page de démonstration"
    echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "✅ PHP détecté"
    echo "🚀 Démarrage du serveur sur http://localhost:8000"
    echo "📝 Ouvrez demo.html pour voir la page de démonstration"
    echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    php -S localhost:8000
else
    echo "❌ Aucun serveur disponible (Python ou PHP requis)"
    echo "💡 Installez Python 3 ou PHP pour démarrer le serveur local"
    echo "🌐 Ou ouvrez directement index.html dans votre navigateur"
fi
