FROM openjdk:11

ENV HOME /usr/src/app
WORKDIR $HOME
COPY . .

RUN chmod +x gradlew
RUN ./gradlew bootJar

ENV SPRING_APP_PROFILES=
ENV SPRING_APP_REDIRECT_URL=http://localhost:3000/*
ENV SPRING_APP_KEYCLOAK_SERVER_URL=http://localhost:9000/auth
ENV SPRING_APP_KEYCLOAK_SERVER_INSIDE=http://localhost:9000/auth

ENV SPRING_APP_PORT=8080

EXPOSE ${SPRING_APP_PORT}

ENTRYPOINT ["java", "-jar", "bootJar.jar"]
