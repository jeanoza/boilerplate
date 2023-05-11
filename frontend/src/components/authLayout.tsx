import Navbar from "./navbar";
import Footer from "./footer"

export default function AuthLayout(props: React.PropsWithChildren) {
	return <>
		<Navbar />
		<div className="h-screen mt-16 relative">
			{props.children}
			<Footer />
		</div>
	</>
}