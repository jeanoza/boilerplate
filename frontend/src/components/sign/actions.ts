import axios from 'axios';

export interface SigninData {
	email: string;
	password: string;
}

export interface SignupData extends SigninData {
	email: string;
	firstName: string;
	lastName: string;
	nickName: string;
}

export async function signup(data: SignupData) {
	return await axios.post('api/auth/signup', data, { withCredentials: true });
}
export async function signin(data: SigninData) {
	return await axios.post('api/auth/signin', data, { withCredentials: true });
}

export async function signout() {
	return await axios.get('api/auth/signout', { withCredentials: true });
}