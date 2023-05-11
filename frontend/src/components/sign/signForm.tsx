import { useLocation } from "react-router-dom";

export default function SignForm() {
	const { pathname } = useLocation();
	const isSignUp = pathname === "/sign-up" ? true : false;
	return <form data-testid="signForm">
		{isSignUp ? "isSignUp" : "isSignIn"}
	</form>
}