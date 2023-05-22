import express from "express";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
// const authController;

//getCurrentUserInfo by token
router.get("/", (req, res, next) => {
  console.log("current User");
  res.send("current User");
});

//signin
router.post("/signin", (req, res, next) => {
  console.log("signin");
  res.send("signin");
});

//signup
router.post("/signup", (req, res, next) => {
  console.log("signup");
  res.send("signup");
});

export default router;
