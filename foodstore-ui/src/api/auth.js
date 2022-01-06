import axios from 'axios';

import {config} from '../config';

export async function registerUser(data){
	return await axios.post(`${config.api_host}/auth/register`, data);
	// didapat dari config api_host
}

export async function loginUser(email, password){
	return await axios.post(`${config.api_host}/auth/login`, {email, password});
}

export async function logout(){
	let {token} = localStorage.getItem('auth')
			?JSON.parse(localStorage.getItem('auth'))
			:{};

	// perlu mengirim token, agar sistem mengenali user mana yang minta logout

	return await axios.post(`${config.api_host}/auth/logout`, null, {
		headers:{
			authorization:`Bearer ${token}`
		}
	}).then((response) => {
		localStorage.removeItem('auth');
		return response;
	});
}
