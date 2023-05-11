import { render, screen } from "@testing-library/react"
import Auth from "./auth"
import { BrowserRouter } from "react-router-dom"

describe('<Auth />', () => {
	it('render without error', () => {
		render(<Auth />, { wrapper: BrowserRouter });

		const authElement = screen.getByTestId('auth');
		expect(authElement).toBeInTheDocument();
	})

})