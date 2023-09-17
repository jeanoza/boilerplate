import { act, fireEvent, render, screen } from '@testing-library/react';
import SignForm from './signForm';
import { BrowserRouter, Location } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn(),
}));
jest.mock('axios');
describe('<SignForm/>', () => {

	describe('/sign-up router', () => {
		beforeEach(() => {
			//mock useLocation
			(useLocation as jest.Mock).mockReturnValue({ pathname: '/sign-up' } as Location);
			render(<SignForm />, { wrapper: BrowserRouter });
		});

		it('render without error', () => {
			const signForm = screen.getByRole('form');
			const { pathname } = useLocation();
			expect(signForm).toBeInTheDocument();
			expect(pathname).toBe('/sign-up');
		});

		it('has 3 field for sign-up', () => {
			const signUpFields = screen.getAllByTestId('signUpField');
			expect(signUpFields.length).toBe(3);
		});

		it('should send form data on click submit button', async() => {
			(axios.post as jest.Mock).mockImplementation(() => Promise.resolve({ data: {} }));
			const signForm = screen.getByRole('form');
			const submitBtn = screen.getByRole('button');
			const handleSubmitMock = jest.fn();
			window.alert = jest.fn();

			signForm.addEventListener('submit', handleSubmitMock);

			fireEvent.change(screen.getByLabelText('Nick name'), {
				target: { value: 'TestUser' },
			});
			fireEvent.change(screen.getByLabelText('First name'), {
				target: { value: 'John' },
			});
			fireEvent.change(screen.getByLabelText('Last name'), {
				target: { value: 'Doe' },
			});
			fireEvent.change(screen.getByLabelText('Email'), {
				target: { value: 'test@example.com' },
			});
			fireEvent.change(screen.getByLabelText('Password'), {
				target: { value: 'testpassword' },
			});

			await act(async() => {
				fireEvent.submit(submitBtn);
			});

			expect(axios.post).toHaveBeenCalledWith(
				'http://localhost:8888/api/auth/signup',
				{
					nickName: 'TestUser',
					firstName: 'John',
					lastName: 'Doe',
					email: 'test@example.com',
					password: 'testpassword',
				}, { 'withCredentials': true },
			);
		});

		it('should throw error when fail on validation', async() => {
			const axiosError = {
				response: {
					status: '500',
					data: {
						message: 'Internal Server Error',
					},
				},
			};
			(axios.post as jest.Mock).mockRejectedValue(axiosError);
			const submitBtn = screen.getByRole('button');
			await act(async() => {
				fireEvent.submit(submitBtn);
			});

			// Assertions
			await expect(axios.post).rejects.toEqual(axiosError);

			// Clean up
			jest.useRealTimers();
		});


	});
	describe('/sign-in router', () => {
		beforeEach(() => {
			//mock useLocation
			(useLocation as jest.Mock).mockReturnValue({ pathname: '/sign-in' } as Location);
			render(<SignForm />, { wrapper: BrowserRouter });
		});
		it('render without error', () => {
			const signForm = screen.getByRole('form');
			const { pathname } = useLocation();
			expect(signForm).toBeInTheDocument();
			expect(pathname).toBe('/sign-in');
		});
		it('has 2 common fields(email, password)', () => {
			const commonFields = screen.getAllByTestId('commonField');
			expect(commonFields.length).toBe(2);
		});
	});

});