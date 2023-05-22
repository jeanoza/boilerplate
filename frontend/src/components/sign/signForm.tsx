import { useLocation } from "react-router-dom";
import InputField from "../inputField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "../alertModal";
import { SignButton } from "./signButton";



export default function SignForm() {
	const { pathname } = useLocation();
	const { reset, register, handleSubmit } = useForm();
	const isSignUp = pathname === "/sign-up" ? true : false;
	const [errors, setErrors] = useState<unknown[]>([]);

	async function onSubmit(data: any) {
		if (isSignUp) {
			const url = "http://localhost:8888/api/auth/signup"
			axios.post(url, data, {
				withCredentials: true
			})
				.then(res => {
					// console.log(res);
					reset();
					window.alert('Form submitted');
				}).catch(error => {
					// console.log(error);
					const _error = error.response.data.error
					const isOneError = typeof _error === 'string';
					if (_error) {
						setErrors(isOneError ? [_error] : _error)
						setTimeout(() => {
							setErrors([]);
						}, 1600)
					}
				})
		} else {
			//sign in with auth
			// const url = "http://localhost:8888/api/user"
			// axios.get(url, 
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
		<div className="absolute z-10">
			{errors.length > 0 &&
				errors.map((error: any, i) => <AlertModal key={i} alertText={error} />)
			}
		</div>
		<InputField register={register} type="text" name="Email" placeholder="jean@example.com" testid="commonField" />
		<InputField register={register} type="password" name="Password" placeholder="1q2w3e4r5t6y!" testid="commonField" />
		<SignButton isSignUp={isSignUp} />
	</form>
}