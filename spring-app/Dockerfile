FROM openjdk:11

ENV HOME /usr/src/app
WORKDIR $HOME
COPY . .

RUN ./gradlew bootJar

ENV SS_PORT 8080
EXPOSE $SS_PORT

ENTRYPOINT ["java", "-jar", "bootJar.jar"]

#docker build -t spring-app .
#docker run -d -p 8080:8080 --name enroll-market-backend spring-app
