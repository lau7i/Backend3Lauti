import { Router } from "express";
import User from "../dao/models/user.model.js";

const router = Router();

/**
 * @swagger
 * components:
 * schemas:
 * User:
 * type: object
 * properties:
 * _id:
 * type: string
 * description: ID autogenerado por MongoDB
 * first_name:
 * type: string
 * description: Nombre del usuario
 * email:
 * type: string
 * description: Correo electrónico
 * role:
 * type: string
 * description: Rol del usuario (user/admin)
 * pets:
 * type: array
 * description: Lista de mascotas adoptadas
 * items:
 * type: object
 */

/**
 * @swagger
 * /api/users:
 * get:
 * summary: Obtener todos los usuarios
 * tags: [Users]
 * responses:
 * 200:
 * description: Lista de usuarios obtenida exitosamente
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

/**
 * @swagger
 * /api/users/{uid}:
 * get:
 * summary: Obtener un usuario por ID
 * tags: [Users]
 * parameters:
 * - in: path
 * name: uid
 * schema:
 * type: string
 * required: true
 * description: ID del usuario
 * responses:
 * 200:
 * description: Usuario encontrado
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 404:
 * description: Usuario no encontrado
 */
router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" });
    res.send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;