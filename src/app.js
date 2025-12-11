import express from "express";
import mongoose from "mongoose";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/coder-mocking")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
