FROM node:16

WORKDIR /src

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run start:dev