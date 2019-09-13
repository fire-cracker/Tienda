FROM node:12.6.0
LABEL Oyedeji Peace <oyedejipeace@gmail.com>

# SETUP DATABASES
ENV MYSQL_DATABASE 'tienda'
ENV MYSQL_ROOT_PASSWORD 'root'
ENV MYSQL_USER 'tienda'
ENV MYSQL_PASSWORD 'tienda'

COPY ./server/model/tshirtshop.sql /docker-entrypoint-initdb.d/dump.sql

ENV NODE_ENV=development
COPY package.json package-lock.json ./

RUN apt-get update && \
    apt-get install curl software-properties-common make -y && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get update && \
    apt-get install -y \
    nodejs

RUN apt-get install build-essential -y

RUN mkdir /Tienda
WORKDIR /

COPY package-*.json .
RUN npm install

COPY . .

EXPOSE 80
COPY tienda-entrypoint.sh /tienda-entrypoint.sh

CMD ["sh", "tienda-entrypoint.sh"]
