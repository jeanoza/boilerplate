import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar, { NAV_ELEMENTS } from './navbar';

describe('<Navbar/>', () => {
	beforeEach(() => {
		render(<Navbar />, { wrapper: BrowserRouter });
	});

	it('renders without error', () => {

		const navbarElement = screen.getByTestId('navbar');
		expect(navbarElement).toBeInTheDocument();
	});
	it('has navbarUl', () => {
		const navbarUl = screen.getByTestId('navbar-ul');
		const childNodes = navbarUl.childNodes;

		expect(childNodes.length).toStrictEqual(NAV_ELEMENTS.length);
	});
	it('has dropdown-navbarUl', () => {
		const navbarUl = screen.getByTestId('dropdown-navbar-ul');
		const childNodes = navbarUl.childNodes;

		expect(childNodes.length).toStrictEqual(NAV_ELEMENTS.length);
	});
	it('has each li that contains correct name and link', () => {
		NAV_ELEMENTS.forEach(el => {
			const linkElementList = screen.getAllByRole('link', { name: `${el.name}` });
			linkElementList.forEach(link => {
				expect(link).toBeInTheDocument();
				expect(link).toHaveTextContent(el.name);
				expect(link).toHaveAttribute('href', `${el.path}`);
			});
		});
	});
});
