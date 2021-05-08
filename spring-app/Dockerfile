FROM openjdk:11

ENV HOME /usr/src/app
WORKDIR $HOME
COPY . .

RUN chmod +x gradlew
RUN ./gradlew bootJar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "bootJar.jar"]
