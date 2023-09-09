import { Link } from 'react-router-dom';

export function SignButton({ isSignUp }: { isSignUp: boolean }) {
	return <>
		<div className="my-2">
			<span>Do you have already account?</span>
			<Link to={isSignUp ? '/sign-in' : '/sign-up'} className="btn-link ml-2">
				{isSignUp ? 'Sign in' : 'Sign up'}
			</Link>
		</div>
		<button data-testid="signBtn" className="btn btn-outline btn-primary w-80 mt-2 capitalize">
			{isSignUp ? 'Sign up' : 'Sign in'}
		</button>
	</>;
}
