FROM node:slim

WORKDIR /srv

COPY . .

RUN npm install

CMD [ "node", "server.js" ]

EXPOSE 3000