FROM node:18-alpine
WORKDIR /app
ENV CI=true
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8100
CMD ["npx","ionic","serve","--host","0.0.0.0","--port","8100","--external"]
# Dockerfile pour Ionic React Mobile
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
EXPOSE 8100

# Commande par défaut
CMD ["npm", "start"]
