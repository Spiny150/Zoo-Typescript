FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli && npm install

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]
