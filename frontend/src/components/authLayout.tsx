import Navbar from "./navbar";
import Footer from "./footer"

export default function AuthLayout(props: React.PropsWithChildren) {
	return <>
		<Navbar />
		{props.children}
		<Footer />
	</>
}