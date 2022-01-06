import axios from 'axios'; 

import { config } from '../config';

export async function getProducts(params){
  return await axios 
    .get(`${config.api_host}/api/products`, {
      params
    });
}

export async function getProduct(id){
	return await axios.get(`http://localhost:3000/api/products/${id}`);
}

export async function editProduct(params){
	return await axios.put(`${config.api_host}/api/products/${params._id}`,params)
}

export async function addProduct(params){
	let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

	return await axios.post(`${config.api_host}/api/products`, params, {
		headers : {
			authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		}
	});
}

export async function deleteProduct(id){
	console.log(id)
	return await axios.delete(`${config.api_host}/api/products/${id}`);
}
