#!/bin/bash

# Script pour tester la configuration Docker localement
# Créé pour le projet Doucine

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Test Docker pour l'API Doucine ===${NC}"

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker n'est pas installé. Veuillez installer Docker avant de continuer.${NC}"
    exit 1
fi

# Vérifier que Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose n'est pas installé. Veuillez installer Docker Compose avant de continuer.${NC}"
    exit 1
fi

# Préparer les bases de données
echo -e "${GREEN}Préparation des bases de données...${NC}"
./prepare-db.sh

# Arrêter les conteneurs existants
echo -e "${GREEN}Arrêt des conteneurs existants...${NC}"
docker-compose down

# Construire l'image Docker
echo -e "${GREEN}Construction de l'image Docker...${NC}"
docker-compose -f docker-compose.test.yml build

# Lancer les conteneurs
echo -e "${GREEN}Démarrage des conteneurs...${NC}"
docker-compose -f docker-compose.test.yml up -d

# Vérifier que le conteneur est en cours d'exécution
echo -e "${GREEN}Vérification de l'état du conteneur...${NC}"
sleep 3
if [ "$(docker ps -q -f name=doucine-backend)" ]; then
    echo -e "${GREEN}✓ Le conteneur est en cours d'exécution${NC}"
else
    echo -e "${RED}✗ Le conteneur n'est pas en cours d'exécution${NC}"
    echo -e "${YELLOW}Affichage des logs du conteneur :${NC}"
    docker-compose -f docker-compose.test.yml logs
    exit 1
fi

# Tester l'endpoint de santé
echo -e "${GREEN}Test de l'endpoint de santé...${NC}"
sleep 2
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v2/health)
if [ "$HEALTH_RESPONSE" == "200" ]; then
    echo -e "${GREEN}✓ L'API répond correctement (code HTTP 200)${NC}"
else
    echo -e "${RED}✗ L'API ne répond pas correctement (code HTTP $HEALTH_RESPONSE)${NC}"
    echo -e "${YELLOW}Affichage des logs du conteneur :${NC}"
    docker-compose -f docker-compose.test.yml logs
fi

# Afficher les logs
echo -e "${GREEN}Affichage des logs du conteneur :${NC}"
docker-compose -f docker-compose.test.yml logs

echo -e "${YELLOW}=== Test terminé ===${NC}"
echo -e "${GREEN}L'API devrait être accessible à l'adresse : http://localhost:3000${NC}"
echo -e "${YELLOW}Pour arrêter les conteneurs : docker-compose -f docker-compose.test.yml down${NC}"
echo -e "${YELLOW}Pour voir les logs en temps réel : docker-compose -f docker-compose.test.yml logs -f${NC}"
