FROM node as build

RUN npm i -g npm

RUN mkdir -p /run/secrets
RUN touch /run/secrets/secret

WORKDIR /opt/app

# Copiamos archivos especificos
COPY entrypoint.sh package.json yarn.lock ./

# Instalamos lo necesario
RUN yarn

# Copiamos las carpetas completas
COPY . .

# Agregar permiso de ejecución
RUN chmod +x entrypoint.sh

# Generamos los archivos .js de todo el proyecto
RUN yarn build

#Sobreescribimos sobre un archivo temporal que sustituye al archivo original, .ts por .js al archivo final
RUN sed -i 's/*.ts/*.js/g' src/app/data-source.js

# Ejecutamos entrypoint
CMD "./entrypoint.sh"
# CMD ["/bin/sh", "-c", "chmod +x /opt/app/entrypoint.sh && /opt/app/entrypoint.sh"]