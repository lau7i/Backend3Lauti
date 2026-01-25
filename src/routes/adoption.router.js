import { Router } from "express";
import User from "../dao/models/user.model.js";
import Pet from "../dao/models/pet.model.js";

const router = Router();

router.get("/:uid/:pid", async (req, res) => {
  const { uid, pid } = req.params;
  try {
    const user = await User.findById(uid);
    if (!user)
      return res.status(404).send({ status: "error", error: "User not found" });

    const pet = await Pet.findById(pid);
    if (!pet)
      return res.status(404).send({ status: "error", error: "Pet not found" });

    if (pet.adopted)
      return res
        .status(400)
        .send({ status: "error", error: "Pet is already adopted" });

    user.pets.push(pet._id);
    pet.adopted = true;

    await user.save();
    await pet.save();

    res.send({ status: "success", message: "Pet adopted" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
