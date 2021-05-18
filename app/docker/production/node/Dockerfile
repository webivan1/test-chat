FROM node:latest

WORKDIR app

RUN npm install -g yarn

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./ ./

CMD ["yarn", "build"]
