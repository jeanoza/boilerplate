import Navbar from './navbar';
import Footer from './footer';
import { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext<string | null>(null);

export default function AuthLayout(props: React.PropsWithChildren): JSX.Element {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function getAccessToken(): Promise<void> {
			try {
				const res = await axios.get('http://localhost:8888/api/auth', {
					withCredentials: true
				});
				const { accessToken } = res.data;
				if (accessToken !== null) {
					setAccessToken(accessToken);
					if (window.location.pathname === '/sign-in' || window.location.pathname === '/sign-up')
						navigate('/');
				} else navigate('/sign-in');
			} catch (error) {
				console.error('auth failed');
				// console.error(error);
			}
		}
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getAccessToken();
	}, [accessToken, navigate]);

	return <AuthContext.Provider value={accessToken}>
		<Navbar />
		<div className="h-screen relative flex">
			{props.children}
			<Footer />
		</div>
	</AuthContext.Provider>;
}
