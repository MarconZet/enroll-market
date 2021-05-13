FROM node:alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install

ENV REACT_APP_API_PATH=http://localhost:8080
ENV REACT_APP_KEYCLOAK_PATH=http://localhost:9000
EXPOSE 3000

COPY . .

CMD ["npm", "start"]