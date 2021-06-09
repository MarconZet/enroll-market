FROM node:alpine

WORKDIR /react-app
ENV PATH /react-app/node_modules/.bin:$PATH

ENV REACT_APP_API_PATH=http://localhost:8080
ENV REACT_APP_KEYCLOAK_PATH=http://localhost:9000
EXPOSE 3000

COPY react-app/package.json .
COPY react-app/package-lock.json .
RUN npm install
COPY react-app .
RUN npm run build

WORKDIR /env

ENV API_PATH=http://localhost:8081
ENV KEYCLOAK_PATH=http://localhost:9001

COPY env-server/package.json .
COPY env-server/package-lock.json .
RUN npm install
COPY env-server .

CMD ["npm", "start"]