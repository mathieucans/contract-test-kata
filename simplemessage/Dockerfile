FROM node:15.14.0-alpine

WORKDIR /simple-mail

COPY package*.json ./
COPY out ./out

RUN npm install

EXPOSE 8080
CMD [ "node", "out/index.js" ]
