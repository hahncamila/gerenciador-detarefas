FROM quay.io/quarkus/quarkus-micro-image:2.0

WORKDIR /work/
COPY build/quarkus-app/*.jar /work/
COPY build/quarkus-app/app/ /work/app/
COPY build/quarkus-app/lib/boot/ /work/lib/
COPY build/quarkus-app/lib/main/ /work/lib/
COPY build/quarkus-app/quarkus/ /work/quarkus/

ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0"

# Usar shell para expandir o coringa *
CMD sh -c "java -jar /work/*-runner.jar"
