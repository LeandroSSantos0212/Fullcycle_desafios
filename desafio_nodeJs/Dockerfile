FROM node:14 AS builder

WORKDIR /app

# Instalar Dockerize
ENV DOCKERIZE_VERSION v0.6.1

RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar arquivos da aplicação
COPY . .

EXPOSE 3000

# Usar Dockerize para esperar pelo banco de dados
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "30s", "node", "index.js"]
