import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SignForm from "../components/sign/signForm";
import AuthLayout from "../components/authLayout";

export default function Sign() {

	return <main data-testid="sign" className="m-auto">
		<SignForm />
	</main>
}
