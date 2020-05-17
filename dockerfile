FROM node:12 AS build

WORKDIR /app
COPY . /app

RUN apt update
RUN apt install build-essential -y

RUN npm install
RUN npm run build

FROM node:12

WORKDIR /app
COPY --from=build /app/dist .

EXPOSE 3074
CMD [ "node", "bin/www.js" ] 