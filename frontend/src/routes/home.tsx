import { useContext, useEffect } from "react"
import { AuthContext } from "../components/authLayout"
import Navbar from "../components/navbar";

export default function Home() {
	const accessToken = useContext(AuthContext);
	console.log("home", accessToken);
	return <main data-testid="home" className="m-auto">Home</main>
}