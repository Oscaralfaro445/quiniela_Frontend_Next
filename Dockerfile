# 1. Imagen base con Node
FROM node:18-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos package.json y package-lock.json
COPY package*.json ./

# 4. Instalamos dependencias
RUN npm install

# 5. Copiamos todo el proyecto
COPY . .

# 6. Construimos la app de Next
RUN npm run build

# 7. Puerto que usa Next por defecto
EXPOSE 3000

# 8. Comando para arrancar la app
CMD ["npm", "start"]
