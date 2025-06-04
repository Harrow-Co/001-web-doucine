FROM node:18-alpine AS builder

# Créer le répertoire de l'application
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers source
COPY . .

# Compiler le serveur TypeScript
RUN npm run build:server

# Étape de production avec une image plus légère
FROM node:18-alpine

# Créer le répertoire de l'application
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Copier les fichiers compilés depuis l'étape de build
COPY --from=builder /usr/src/app/dist ./dist

# Créer le répertoire pour les bases de données
RUN mkdir -p /usr/src/app/data

# Exposer le port sur lequel l'application s'éxécute
EXPOSE 3000

# Définir les variables d'environnement
ENV NODE_ENV=production

# Commande de démarrage
CMD ["node", "dist/server/server.js"]
