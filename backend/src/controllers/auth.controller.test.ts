import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import * as auth from '../middlewares/jwt';

describe('AuthController', () => {
	let authController: AuthController;
	let userService: UserService;
	let req: Request;
	let res: Response<unknown, Record<string, unknown>>;

	//env in test
	const env = process.env;

	//mocks entity
	const mockUser: User = new User();
	mockUser.firstName = 'John';
	mockUser.lastName = 'Doe';
	mockUser.age = 18;
	mockUser.email = 'john@gmail.com';
	mockUser.password = 'test password';

	beforeEach(() => {
		//mocks service functions
		userService = {
			create: jest.fn(),
			findByEmailAndPassword: jest.fn(),
		} as unknown as UserService;
		authController = new AuthController(userService);
		req = {} as Request;
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			cookie: jest.fn(),
		} as unknown as Response;

		jest.resetModules();
		process.env = { ...env };
		process.env.JWT_SECRET = 'jwt-secret';
	});

	afterEach(() => {
		process.env = env;
	});

	describe('register', () => {
		it('sholud return a response {success:true} and access token via cookie ', async() => {
			req = { body: mockUser } as unknown as Request;
			jest.spyOn(userService, 'create').mockResolvedValueOnce(mockUser);
			jest.spyOn(auth, 'generateAccessToken').mockReturnValueOnce('test-token');

			await authController.register(req, res);

			expect(userService.create).toHaveBeenCalledWith(req.body);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({ success: true });
			expect(res.cookie).toHaveBeenCalledWith('accessToken', 'test-token', {
				httpOnly: true,
				secure: true,
				maxAge: Number(process.env.JWT_MAX_AGE),
			});
		});

		it('sholud return an 500 error when fail on validation', async() => {
			const error = 'Internal Server Error';
			jest.spyOn(userService, 'create').mockRejectedValue(new Error(error));

			await authController.register(req, res);

			expect(userService.create).toHaveBeenCalledWith(req.body);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ error });
		});

		it('sholud return an error(409) when input email exist already in db', async() => {
			const error = 'User already exist';
			jest.spyOn(userService, 'create').mockRejectedValue(new Error(error));

			await authController.register(req, res);

			expect(userService.create).toHaveBeenCalledWith(req.body);
			expect(res.status).toHaveBeenCalledWith(409);
			expect(res.json).toHaveBeenCalledWith({ error });
		});
	});

	describe('login', () => {
		it('should return a response {success:true} and access token via cookie', async() => {
			req = {
				body: { email: mockUser.email, password: mockUser.password },
			} as unknown as Request;

			jest.spyOn(userService, 'findByEmailAndPassword')
				.mockResolvedValueOnce(mockUser);
			jest.spyOn(auth, 'generateAccessToken').mockReturnValueOnce('test-token');

			await authController.login(req, res);

			expect(userService.findByEmailAndPassword).toHaveBeenCalledWith(req.body);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({ success: true });
			expect(res.cookie).toHaveBeenCalledWith('accessToken', 'test-token', {
				httpOnly: true,
				secure: true,
				maxAge: Number(process.env.JWT_MAX_AGE),
			});
		});
		it('should throw error when wrong email or password', async() => {
			const error = 'Wrong email or password';
			req = {
				body: { email: mockUser.email, password: mockUser.password },
			} as unknown as Request;

			jest.spyOn(userService, 'findByEmailAndPassword')
				.mockRejectedValueOnce(new Error(error));
			jest.spyOn(auth, 'generateAccessToken')
				.mockReturnValueOnce('test-token');

			await authController.login(req, res);

			expect(userService.findByEmailAndPassword).toHaveBeenCalledWith(req.body);
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({ error });
		});
	});

	describe('getAuth', () => {
		it('should return a response {auth:boolean} ', async() => {
			jest.spyOn(auth, 'verifyToken').mockReturnValueOnce({ id:1, email:'test@test-mock.com' });

			authController.getAuth(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toEqual({ auth:true });
		});
	});
});
