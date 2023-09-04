import { useContext } from 'react';
import { AuthContext } from '../components/authLayout';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function About() {
	const test = useContext(AuthContext);
	console.log('about', test);
	return <main data-testid="about" className="m-auto">About</main>;
}
export default About;
