FROM eclipse-temurin:17-jre

WORKDIR /work/

COPY com.desafio.taskmanager/build/quarkus-app/lib/ /work/lib/
COPY com.desafio.taskmanager/build/quarkus-app/app/ /work/app/
COPY com.desafio.taskmanager/build/quarkus-app/quarkus/ /work/quarkus/
COPY com.desafio.taskmanager/build/quarkus-app/quarkus-run.jar /work/

ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0"

EXPOSE 8080

CMD ["java", "-jar", "/work/quarkus-run.jar"]

