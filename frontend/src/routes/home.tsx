import { useContext } from 'react';
import { AuthContext } from '../components/authLayout';

function handleTest(e: React.MouseEvent): void {
	console.log(e.target);
	window.location.href = '/about';
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Home() {
	const accessToken = useContext(AuthContext);
	console.log(accessToken);

	return <main data-testid="home" className="m-auto"> <button onClick={handleTest}>here</button> Home </main>;
}

export default Home;
