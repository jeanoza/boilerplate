import Navbar from "./navbar";
import Footer from "./footer"

export default function AuthLayout(props: React.PropsWithChildren) {
	return <>
		<Navbar />
		<div className="h-screen relative flex">
			{props.children}
			<Footer />
		</div>
	</>
}