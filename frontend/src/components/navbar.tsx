import { Link } from "react-router-dom"

export const NAV_ELEMENTS = [
	{
		name: "home",
		path: "/"
	},
	{
		name: "about",
		path: "/about"
	}
]
export default function Navbar() {
	return <div data-testid="navbar" className="navbar bg-base-100">
		<div className="navbar-start">
			<div className="dropdown">
				<label tabIndex={0} className="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
				</label>
				<ul data-testid="dropdown-navbar-ul" tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					{NAV_ELEMENTS.map((el, index) => <li key={el.name} className="capitalize"><Link to={el.path} >{el.name}</Link></li>)}
				</ul>
			</div>
			<Link to="/" className="btn btn-ghost normal-case text-xl">Boilerplate</Link>
		</div>
		<div className="navbar-center hidden lg:flex">
			<ul data-testid="navbar-ul" className="menu menu-horizontal px-1">
				{NAV_ELEMENTS.map((el, index) => <li key={el.name} className="capitalize"><Link to={el.path}>{el.name}</Link></li>)}
			</ul>
		</div>
		<div className="navbar-end">
			{/* <Link className="btn">Get started</Link> */}
		</div>
	</div>
}

//https://daisyui.com/components/navbar/