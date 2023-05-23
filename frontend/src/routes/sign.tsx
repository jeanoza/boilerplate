import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SignForm from "../components/sign/signForm";

export default function Sign() {
	const navigate = useNavigate();

	// if (localStorage.set('accessToken')) navigate("/")
	return <>
		<Navbar />
		<div className="h-screen relative flex">
			<main data-testid="sign" className="m-auto">
				<SignForm />
			</main>
			<Footer />
		</div>
	</>
}
