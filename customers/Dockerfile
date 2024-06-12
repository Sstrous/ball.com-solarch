FROM node:18

WORKDIR /app

COPY . .

COPY libs/ball-com /app/libs/ball-com

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000