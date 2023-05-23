import Navbar from "./navbar";
import Footer from "./footer"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AuthLayout(props: React.PropsWithChildren) {
	// const [accessToken, setAccessToken] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function getAccessToken() {
			try {
				const res = await axios.get("http://localhost:8888/api/auth", {
					withCredentials: true
				})
				if (res.data.accessToken) {

					// localStorage.setItem('accessToken', res.data.accessToken)
				}
				else navigate("/sign-in")
			} catch (error) {
				console.log(error);
			}
		}
		getAccessToken();
	}, [navigate])

	return <>
		<Navbar />
		<div className="h-screen relative flex">
			{props.children}
			<Footer />
		</div>
	</>
}