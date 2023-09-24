import express from 'express';
import { UserService } from '../services/user.service';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { AuthController } from '../controllers/auth.controller';
import { validateCreateUser } from '../middlewares/validators/user.validator';

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

//verifyAuth
router.get('/', authController.getAuth.bind(authController));

//signout(logout)
router.get('/signout', authController.logout.bind(authController));
//signin(login)
router.post('/signin', authController.login.bind(authController));
//signup(register)
router.post('/signup', validateCreateUser, authController.register.bind(authController));

export default router;
