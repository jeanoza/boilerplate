import { Link } from "react-router-dom"

export default function Navbar() {
	const paths = {
		home: {
			name: "home",
			path: "/"
		},
		about: {
			name: "about",
			path: "/about"
		}
	}

	return <div className="navbar bg-base-100">
		<div className="navbar-start">
			<div className="dropdown">
				<label tabIndex={0} className="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
				</label>
				<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					{Object.values(paths).map(el => <li><Link to={el.path}>{el.name}</Link></li>)}
				</ul>
			</div>
			<Link to="/" className="btn btn-ghost normal-case text-xl">Boilerplate</Link>
		</div>
		<div className="navbar-center hidden lg:flex">
			<ul className="menu menu-horizontal px-1">
				{Object.values(paths).map(el => <li><Link to={el.path}>{el.name}</Link></li>)}
			</ul>
		</div>
		<div className="navbar-end">
			{/* <Link className="btn">Get started</Link> */}
		</div>
	</div>
}

//https://daisyui.com/components/navbar/