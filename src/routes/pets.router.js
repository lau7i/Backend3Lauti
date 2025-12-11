import { Router } from "express";
import Pet from "../dao/models/pet.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const pets = await Pet.find();
  res.send({ status: "success", payload: pets });
});

export default router;
