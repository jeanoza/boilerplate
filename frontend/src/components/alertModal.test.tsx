import { render, screen } from "@testing-library/react";
import { AlertModal } from "./alertModal"

describe("<AlertModal />", () => {
	it("should render without error", () => {
		const alertText = "Test alert"
		render(<AlertModal alertText={alertText} />);

		const container = screen.getByText(/test alert/i);

		expect(container).toBeInTheDocument();
	})
})