import { render, screen } from "@testing-library/react";
import SignForm from "./signForm";
import { BrowserRouter, Location } from "react-router-dom";
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn(),
}));

describe('<SignForm/>', () => {
	it('render with /sign-up path', () => {
		//mock router
		(useLocation as jest.Mock).mockReturnValue({ pathname: '/sign-up' } as Location);

		render(<SignForm />, { wrapper: BrowserRouter })
		const signForm = screen.getByTestId('signForm');
		const { pathname } = useLocation();
		expect(signForm).toBeInTheDocument();
		expect(pathname).toBe('/sign-up')
	})
	it('render with /sign-in path', () => {
		//mock router
		(useLocation as jest.Mock).mockReturnValue({ pathname: '/sign-in' } as Location);

		render(<SignForm />, { wrapper: BrowserRouter })
		const signForm = screen.getByTestId('signForm');
		const { pathname } = useLocation();
		expect(signForm).toBeInTheDocument();
		expect(pathname).toBe('/sign-in')
	})
});