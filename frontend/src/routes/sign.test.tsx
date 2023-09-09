import { render, screen } from '@testing-library/react';
import Sign from './sign';
import { BrowserRouter } from 'react-router-dom';

describe('<Sign />', () => {
	it('renders without error', () => {
		render(<Sign />, { wrapper: BrowserRouter });

		const authElement = screen.getByTestId('sign');
		expect(authElement).toBeInTheDocument();
	});
});