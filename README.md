# Proyecto Final - Backend Adopciones (Dockerización)

Este proyecto es una API diseñada para gestionar usuarios, mascotas y adopciones. Incluye generación de datos (mocks), documentación automatizada con Swagger, tests funcionales y está completamente contenerizado con Docker.

## DockerHub Image

La imagen del proyecto ha sido subida y está disponible públicamente:

🔗 **Link:** [https://hub.docker.com/r/lautaroiri/backend-adopcion](https://hub.docker.com/r/lautaroiri/backend-adopcion)

## Instrucciones de Ejecución

### Ejecutar desde DockerHub
Para descargar y ejecutar la aplicación sin necesidad de configurar el código localmente:

```bash
docker pull lautaroiri/backend-adopcion:v1
docker run -p 8080:8080 lautaroiri/backend-adopcion:v1
