import { Link, useLocation } from "react-router-dom";
import InputField from "../inputField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function SignBtnCont({ isSignUp }: { isSignUp: boolean }) {
	return <>
		<div className="my-2">
			<span>Do you have already account?</span>
			<Link to={isSignUp ? "/sign-in" : "/sign-up"} className="btn-link ml-2">
				{isSignUp ? "Sign in" : "Sign up"}
			</Link>
		</div>
		<button data-testid="signBtn" className="btn btn-outline btn-primary w-80 mt-2 capitalize">
			{isSignUp ? "Sign up" : "Sign in"}
		</button>
	</>
}

function AlertModal({ alertText, style }: { alertText: string | undefined, style: Object }) {
	return <div style={style} className="alert alert-error shadow-lg absolute z-10">
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			<span>{alertText}</span>
		</div>
	</div>
}

export default function SignForm() {
	const { pathname } = useLocation();
	const { register, handleSubmit } = useForm();
	const isSignUp = pathname === "/sign-up" ? true : false;
	const [errors, setErrors] = useState([]);

	async function onSubmit(data: any) {
		axios.post("http://localhost:8888/api/user", data)
			.then(res => {
				console.log(res);
			}).catch(error => {
				const errors = error.response.data?.errors
				if (error) setErrors(errors)
				setTimeout(() => {
					setErrors([]);
				}, 1600)
			})
	}

	return <form aria-label="signForm" className="form-control items-center justify-center relative" onSubmit={handleSubmit(onSubmit)}>
		{isSignUp &&
			<>
				<InputField register={register} type="text" name="Nick name" placeholder="Name to use in this site" testid="signUpField" />
				<InputField register={register} type="text" name="First name" placeholder="Your given name" testid="signUpField" />
				<InputField register={register} type="text" name="Last name" placeholder="Your family name" testid="signUpField" />
			</>
		}
		{errors.length > 0 && errors?.map((error: any, index) => {
			const msg = Object.values(error.constraints)[0] as string;
			const style = { top: `${index * 4}rem` }
			return <AlertModal alertText={msg} style={style} />
		})}
		{/* {alertText && <AlertModal alertText={alertText} />} */}
		<InputField register={register} type="text" name="Email" placeholder="jean@example.com" testid="commonField" />
		<InputField register={register} type="password" name="Password" placeholder="1q2w3e4r5t6y!" testid="commonField" />
		<SignBtnCont isSignUp={isSignUp} />
	</form>
}