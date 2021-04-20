FROM node:alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install

ENV EACT_APP_API_PATH localhost:8080
EXPOSE 3000

COPY . .

CMD ["npm", "run", "build"]