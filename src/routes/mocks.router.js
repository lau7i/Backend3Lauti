import { Router } from "express";
import { generateUsers, generatePets } from "../utils/mocking.js";
import User from "../dao/models/user.model.js";
import Pet from "../dao/models/pet.model.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const pets = generatePets(100);
  res.send({ status: "success", payload: pets });
});

router.get("/mockingusers", (req, res) => {
  const users = generateUsers(50);
  res.send({ status: "success", payload: users });
});

router.post("/generateData", async (req, res) => {
  const { users, pets } = req.body;
  try {
    if (users) {
      const usersData = generateUsers(users);
      await User.insertMany(usersData);
    }
    if (pets) {
      const petsData = generatePets(pets);
      await Pet.insertMany(petsData);
    }
    res.send({ status: "success", message: "Data generated and inserted" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
