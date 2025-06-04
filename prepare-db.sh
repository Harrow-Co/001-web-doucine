#!/bin/bash

# Couleurs pour une meilleure lisibilité
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${YELLOW}=== Préparation des bases de données pour Docker ===${NC}"

# Créer le dossier data s'il n'existe pas
mkdir -p data

# Vérifier si les fichiers de base de données existent à la racine
if [ -f "auth.db" ]; then
    echo -e "${GREEN}Copie de auth.db vers le dossier data/${NC}"
    cp auth.db data/
    echo -e "${GREEN}✓ auth.db copié avec succès${NC}"
else
    echo -e "${YELLOW}Fichier auth.db non trouvé à la racine${NC}"
    # Vérifier si le fichier existe déjà dans data/
    if [ -f "data/auth.db" ]; then
        echo -e "${GREEN}✓ auth.db existe déjà dans le dossier data/${NC}"
    else
        echo -e "${RED}✗ auth.db n'existe ni à la racine ni dans data/${NC}"
        # Créer un fichier vide pour éviter les erreurs
        touch data/auth.db
        echo -e "${YELLOW}Création d'un fichier auth.db vide${NC}"
    fi
fi

if [ -f "events.db" ]; then
    echo -e "${GREEN}Copie de events.db vers le dossier data/${NC}"
    cp events.db data/
    echo -e "${GREEN}✓ events.db copié avec succès${NC}"
else
    echo -e "${YELLOW}Fichier events.db non trouvé à la racine${NC}"
    # Vérifier si le fichier existe déjà dans data/
    if [ -f "data/events.db" ]; then
        echo -e "${GREEN}✓ events.db existe déjà dans le dossier data/${NC}"
    else
        echo -e "${RED}✗ events.db n'existe ni à la racine ni dans data/${NC}"
        # Créer un fichier vide pour éviter les erreurs
        touch data/events.db
        echo -e "${YELLOW}Création d'un fichier events.db vide${NC}"
    fi
fi

# Afficher le contenu du dossier data/
echo -e "${GREEN}Contenu du dossier data/ :${NC}"
ls -la data/

echo -e "${YELLOW}=== Préparation terminée ===${NC}"
