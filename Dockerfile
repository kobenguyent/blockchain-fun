FROM node:18

WORKDIR /app
COPY . .

RUN npm i
RUN npm run build
RUN npm run swagger

EXPOSE 8000

CMD ["npm", "start"]
