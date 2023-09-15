import { useContext } from 'react';
import { AuthContext } from '../components/authLayout';

function handleTest(e: React.MouseEvent): void {
	console.log(e.target);
	window.location.href = '/about';
}

function Home() {
	const accessToken = useContext(AuthContext);

	return <main data-testid="home" className="m-auto"> <button onClick={handleTest}>here</button> Home </main>;
}

export default Home;
