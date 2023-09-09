import { useContext } from 'react';
import { AuthContext } from '../components/authLayout';

function About() {
	const test = useContext(AuthContext);
	console.log('about', test);
	return <main data-testid="about" className="m-auto">About</main>;
}
export default About;
