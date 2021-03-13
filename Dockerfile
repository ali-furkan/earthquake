FROM node:current-alpine

WORKDIR /app

COPY package.json nest-cli.json ./
COPY tsconfig.build.json tsconfig.json ./

RUN npm i

COPY src src

RUN npm run build

ENV PORT=8080

EXPOSE ${PORT}

CMD [ "npm run start:prod" ]
