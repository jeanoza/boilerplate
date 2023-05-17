import { Link, useLocation } from "react-router-dom";
import InputField from "../inputField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "../alertModal";
import { SignButton } from "./signButton";



export default function SignForm() {
	const { pathname } = useLocation();
	const { register, handleSubmit } = useForm();
	const isSignUp = pathname === "/sign-up" ? true : false;
	const [errors, setErrors] = useState([]);

	async function onSubmit(data: any) {
		if (isSignUp) {
			const url = "http://localhost:8888/api/user"
			axios.post(url, data)
				.then(res => {
					console.log(res);
				}).catch(error => {
					const errors = error.response.data?.errors
					if (error) {
						setErrors(errors)
						setTimeout(() => {
							setErrors([]);
						}, 1600)
					}
				})
		} else {
			//sign in with auth
		}
	}

	return <form aria-label="signForm" className="form-control items-center justify-center relative" onSubmit={handleSubmit(onSubmit)}>
		{isSignUp &&
			<>
				<InputField register={register} type="text" name="Nick name" placeholder="Name to use in this site" testid="signUpField" />
				<InputField register={register} type="text" name="First name" placeholder="Your given name" testid="signUpField" />
				<InputField register={register} type="text" name="Last name" placeholder="Your family name" testid="signUpField" />
			</>
		}
		{errors.length > 0 &&
			<div className="absolute z-10">
				{errors.map((error: any, i) => Object.values(error.constraints).map((constraint, j) => {
					const msg = constraint as string;
					return <AlertModal key={i + j} alertText={msg} />
				}))}
			</div>
		}
		<InputField register={register} type="text" name="Email" placeholder="jean@example.com" testid="commonField" />
		<InputField register={register} type="password" name="Password" placeholder="1q2w3e4r5t6y!" testid="commonField" />
		<SignButton isSignUp={isSignUp} />
	</form>
}