import { Router } from "express";
import User from "../dao/models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send({ status: "success", payload: users });
});

export default router;
