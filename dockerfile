
FROM node:14


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3014

CMD ["node", "app.js"]