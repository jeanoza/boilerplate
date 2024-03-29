import { useLocation } from 'react-router-dom';
import InputField from '../inputField';
import { FieldValue, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { AlertModal } from '../alertModal';
import { SignButton } from './signButton';
import { SigninData, SignupData, signin, signup } from './actions';



export default function SignForm() {
	const { pathname } = useLocation();
	const { reset, register, handleSubmit } = useForm();
	const isSignUp = pathname === '/sign-up' ? true : false;
	const [errors, setErrors] = useState<unknown[]>([]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function onSubmit(data: FieldValue<SigninData | SignupData>) {
		try {
			if (isSignUp) await signup(data as SignupData);
			else await signin(data as SigninData);
			reset();
			window.location.href = '/';
		} catch (error) {
			const _error = (error instanceof AxiosError) ? error.response?.data.error : error;
			const isOneError = typeof _error === 'string';
			if (_error) {
				setErrors(isOneError ? [_error] : _error);
				setTimeout(() => {
					setErrors([]);
				}, 1600);
			}
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
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				errors.map((error: any, i) => <AlertModal key={i} alertText={error} />)
			}
		</div>
		<InputField register={register} type="text" name="Email" placeholder="jean@example.com" testid="commonField" />
		<InputField register={register} type="password" name="Password" placeholder="1q2w3e4r5t6y!" testid="commonField" />
		<SignButton isSignUp={isSignUp} />
	</form>;
}