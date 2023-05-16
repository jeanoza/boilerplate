import { Link, useLocation } from "react-router-dom";
import InputField from "../inputField";
import { useForm } from "react-hook-form";
import axios from "axios";

function SignBtnCont({ isSignUp }: { isSignUp: boolean }) {
	return <>
		<div className="my-2">
			<span>Do you have already account?</span>
			<Link to={isSignUp ? "/sign-in" : "/sign-up"} className="btn-link ml-2">
				{isSignUp ? "Sign in" : "Sign up"}
			</Link>
		</div>
		<button className="btn btn-outline btn-primary w-80 mt-2 capitalize">
			{isSignUp ? "Sign up" : "Sign in"}
		</button>
	</>
}

export default function SignForm() {
	const { pathname } = useLocation();
	const { register, handleSubmit } = useForm();
	const isSignUp = pathname === "/sign-up" ? true : false;

	async function onSubmit(data: any) {
		axios.post("http://localhost:8888/api/user", data)
			.then(res => {
				console.log(res);
			})
	}

	return <form aria-label="signForm" className="form-control items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
		{isSignUp &&
			<>
				<InputField register={register} type="text" name="Nick name" placeholder="Name to use in this site" testid="signUpField" />
				<InputField register={register} type="text" name="First name" placeholder="Your given name" testid="signUpField" />
				<InputField register={register} type="text" name="Last name" placeholder="Your family name" testid="signUpField" />
			</>
		}
		<InputField register={register} type="text" name="Email" placeholder="jean@example.com" testid="commonField" />
		<InputField register={register} type="password" name="Password" placeholder="1q2w3e4r5t6y!" testid="commonField" />
		<SignBtnCont isSignUp={isSignUp} />
	</form>
}