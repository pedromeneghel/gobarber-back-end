FROM node:12.20.2-alpine3.11

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333
CMD ["yarn", "dev:server"]
