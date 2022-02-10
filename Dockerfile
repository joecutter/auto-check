FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npm run build

COPY . .

EXPOSE 3111

CMD ["node", "dist/main"]