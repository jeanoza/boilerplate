import AuthLayout from "../components/authLayout";
import SignForm from "../components/sign/signForm";


export default function Sign() {
	return <AuthLayout>
		<main data-testid="sign" className="m-auto">
			<SignForm />
		</main>
	</AuthLayout>
}