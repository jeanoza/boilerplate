import express from "express";
import UserController from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", userController.findAll.bind(userController));
router.get("/:id", userController.findById.bind(userController));

export default router;
