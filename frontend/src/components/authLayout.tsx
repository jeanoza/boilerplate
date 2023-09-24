import Navbar from './navbar';
import Footer from './footer';
import { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext<boolean | null>(null);

export default function AuthLayout(props: React.PropsWithChildren): JSX.Element {
	const [auth, setAuth] = useState<boolean | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function getAccessToken(): Promise<void> {
			try {
				const res = await axios.get('http://localhost:8888/api/auth', {
					withCredentials: true
				});
				const { auth } = res.data;
				if (auth === true) {
					const { pathname } = window.location;
					setAuth(auth);
					if (pathname === '/sign-in' || pathname === '/sign-up')
						navigate('/');
				} 
			} catch (error) {
				console.error('auth failed');
				const { pathname } = window.location;
				if (pathname !== '/sign-in' && pathname !== '/sign-up')
					navigate('/sign-in');
			}
		}
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getAccessToken();
	}, [auth, window.location.pathname, navigate]);

	return <AuthContext.Provider value={auth}>
		<Navbar />
		<div className="h-screen relative flex">
			{props.children}
			<Footer />
		</div>
	</AuthContext.Provider>;
}
