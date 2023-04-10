FROM node:18-alpine

WORKDIR /apps/shopping-node-react

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

ENV VITE_APP_SERVER_URL http://172.16.238.11:3000

RUN npm run build

CMD ["npm","run","serve"]