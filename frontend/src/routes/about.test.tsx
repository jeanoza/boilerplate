import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './about';

describe('<About />', () => {
	it('render without error', () => {
		render(<About />, { wrapper: BrowserRouter });
		const homeElement = screen.getByTestId("about");
		expect(homeElement).toBeInTheDocument();
		expect(homeElement).toHaveTextContent('About')
	})
});
