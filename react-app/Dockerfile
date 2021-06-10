FROM node:alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install

ENV REACT_APP_API_PATH=https://em.marconzet.pl
ENV REACT_APP_KEYCLOAK_PATH=https://keycloak.marconzet.pl
EXPOSE 3000

COPY . .

RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
