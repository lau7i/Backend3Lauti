import express from "express";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionRouter from "./routes/adoption.router.js";

const app = express();
const PORT = 8080;

const MONGO_URL = "mongodb+srv://lautaro:Ok4NyR8Vt6cUmPbk@clusterbackend3.edhwrsi.mongodb.net/?appName=Clusterbackend3";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Conectado con éxito a MongoDB Atlas"))
  .catch((error) => console.log("Error al conectar a la DB:", error));

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación API Adopciones",
      description: "API para gestión de usuarios, mascotas y adopciones",
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));