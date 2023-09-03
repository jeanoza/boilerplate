import { useContext, useEffect } from "react"
import { AuthContext } from "../components/authLayout"
import Navbar from "../components/navbar";

function handleTest(e: any) {
	console.log(e.target);
	window.location.href = "/about"

}

export default function Home() {
	const accessToken = useContext(AuthContext);

	console.log("home", accessToken);
	return <main data-testid="home" className="m-auto">
		<button onClick={handleTest}>here</button>
		Home
	</main>
}