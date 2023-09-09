import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';
import { render, screen } from '@testing-library/react';


describe('<Footer/>', () => {
	beforeEach(() => {
		render(<Footer />, { wrapper: BrowserRouter });
	});
	it('render without error', () => {
		const footer = screen.getByTestId('footer');
		expect(footer).toBeInTheDocument();
	});
	it('has a github link and redirect to my github', () => {
		const githubLink = screen.getByTestId('github-link');
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute('href', 'https://www.github.com/jeanoza');
	});
	it('has a linkedin link and redirect to my linkedin', () => {
		const linkedinLink = screen.getByTestId('linkedin-link');
		expect(linkedinLink).toBeInTheDocument();
		expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kyubong-choi-489198176/');
	});
});