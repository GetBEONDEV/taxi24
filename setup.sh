#!/bin/bash

# Solicitar permisos de sudo al principio
echo "Solicitando permisos de administrador..."
sudo -v

# Mantener los permisos de sudo activos durante la ejecución del script
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

# Instalar dependencias del proyecto (asumiendo que ya tienes Node.js y npm instalados)
echo "Instalando dependencias..."
npm install

# Levantar el contenedor Docker (asumiendo que ya tienes Docker instalado)
echo "Levantando contenedor Docker..."
docker-compose up --build -d

# Dormir por unos segundos para asegurarse de que el contenedor esté listo
sleep 20

# Conectarse al contenedor de PostgreSQL y activar PostGIS
echo "Activando PostGIS en la base de datos..."
CONTAINER_NAME=$(docker ps --filter "label=custom_label=my_postgres" --format "{{.Names}}")
DB_USER=root
DB_NAME=my_db


# Instalar PostGIS
docker exec -it $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -c "CREATE EXTENSION postgis;"

# Ejecutar el proyecto
echo "Iniciando el proyecto..."
npm run start:dev
