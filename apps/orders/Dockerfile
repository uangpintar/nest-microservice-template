FROM node:alpine as development

WORKDIR /usr/src/app

COPY /apps/orders/package*.json ./


RUN npm config set legacy-peer-deps true

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY /apps/orders/package*.json ./

RUN npm config set legacy-peer-deps true

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/orders/main"]