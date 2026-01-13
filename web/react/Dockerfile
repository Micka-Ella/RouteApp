# Dockerfile pour React
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port
EXPOSE 3001

# Variable d'environnement pour le port
ENV PORT=3001

# Commande par défaut
CMD ["npm", "start"]
