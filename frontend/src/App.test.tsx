import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
	test('renders home component for the root path', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByTestId('home')).toBeInTheDocument();
	});

	test('renders about component for the "/about" path', () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByTestId('about')).toBeInTheDocument();
	});

	test('renders sign component for the "/sign-up" path', () => {
		render(
			<MemoryRouter initialEntries={['/sign-up']}>
				<App />
			</MemoryRouter>
		);
		const signBtn = screen.getByTestId('signBtn')

		expect(signBtn).toBeInTheDocument();
		expect(signBtn).toHaveTextContent(/sign up/i)

	});

	test('renders sign component for the "/sign-in" path', () => {
		render(
			<MemoryRouter initialEntries={['/sign-in']}>
				<App />
			</MemoryRouter>
		);

		const signBtn = screen.getByTestId('signBtn')

		expect(signBtn).toBeInTheDocument();
		expect(signBtn).toHaveTextContent(/sign in/i)

	});
});
