# Cargar todos los secretos como variables de entorno
for filename in /run/secrets/*; do
  export $(basename $filename)=$(cat $filename)
done

# Ejecutar el comando proporcionado 
exec node src/index.js