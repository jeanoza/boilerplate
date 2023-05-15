/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import SignForm from "./signForm";
import { BrowserRouter, Location } from "react-router-dom";
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn(),
}));

describe('<SignForm/>', () => {
	describe("/sign-up router", () => {

		beforeEach(() => {
			//mock useLocation

			(useLocation as jest.Mock).mockReturnValue({ pathname: '/sign-up' } as Location);
			render(<SignForm />, { wrapper: BrowserRouter })
		})
		it('render without error', () => {
			const signForm = screen.getByRole('form');
			const { pathname } = useLocation();
			expect(signForm).toBeInTheDocument();
			expect(pathname).toBe('/sign-up')
		})
		it('has 3 field for sign-up', () => {
			const signUpFields = screen.getAllByTestId('signUpField');
			expect(signUpFields.length).toBe(3);
		})
		it('send form data on click submit button', () => {
			const signForm = screen.getByRole('form');
			const submitBtn = screen.getByRole('button');
			const handleSubmitMock = jest.fn();

			signForm.addEventListener('submit', handleSubmitMock);
			fireEvent.submit(submitBtn);
			expect(handleSubmitMock).toHaveBeenCalled();
		})
	})
	describe("/sign-in router", () => {
		beforeEach(() => {
			//mock useLocation
			(useLocation as jest.Mock).mockReturnValue({ pathname: '/sign-in' } as Location);
			render(<SignForm />, { wrapper: BrowserRouter })
		})
		it('render without error', () => {
			const signForm = screen.getByRole('form');
			const { pathname } = useLocation();
			expect(signForm).toBeInTheDocument();
			expect(pathname).toBe('/sign-in')
		})
		// it('has 2 common fields(email, password)', () => {
		// 	const commonFields = screen.getAllByTestId('commonField');
		// 	expect(commonFields.length).toBe(2);
		// })
	});

});