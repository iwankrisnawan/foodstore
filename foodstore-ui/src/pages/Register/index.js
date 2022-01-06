import React from 'react';
import {useHistory, Link} from 'react-router-dom';
import {LayoutOne, Card, FormControl, InputText, InputPassword, Button} from 'upkit';
import { useForm } from 'react-hook-form';

import {rules} from './validation';

import { registerUser } from '../../api/auth';
import StoreLogo from '../../components/StoreLogo';

const statuslist = {
	idle: 'idle', 
	process: 'process', 
	success: 'success',
	error: 'error',
}

export default function Register(){

	const {register, handleSubmit, errors, setError} = useForm();

	let [status, setStatus] = React.useState(statuslist.idle);
	let history = useHistory();

	const onSubmit = async formData => {

		let {password, password_confirmation} = formData;

		if(password !== password_confirmation){
			return setError('password_confirmation', {type: 'equality', message: 'Konfirmasi password harus dama dengan password'});
		}

		let {data} = await registerUser(formData);

		if(data.error){
			let fields = Object.keys(data.fields);
			fields.forEach(field =>{
				setError(field, {type:'server', message:data.fields[field]?.properties?.message})
			});

			setStatus(statuslist.error);
			return;
		}
		setStatus(statuslist.success);

		history.push('/register/berhasil');
	}

	return(
		<LayoutOne size="small">
			<br/>
			<Card color="white">
				<div className="text-center mb-5">
					<StoreLogo/>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl errorMessage={errors.full_name?.message}>
						<InputText 
							name="full_name"
							ref={register(rules.full_name)}						
							placeholder="Nama lengkap"
							fitContainer
						/>
					</FormControl>

					<FormControl errorMessage={errors.email?.message}>
						<InputText 
							name="email"
							ref={register(rules.email)}							
							placeholder="Email"
							fitContainer
						/>
					</FormControl>

					<FormControl errorMessage={errors.password?.message}>
						<InputPassword 
							name="password"
							ref={register(rules.password)}							
							placeholder="password"
							fitContainer
						/>
					</FormControl>

					<FormControl errorMessage={errors.password_confirmation?.message}>
						<InputPassword
							name="password_confirmation"
							ref={register(rules.password_confirmation)}						
							placeholder="confirm password"
							fitContainer
						/>
					</FormControl>

					<Button 
						size="large" 
						fitContainer
						disabled= {status === statuslist.process}>

					{status === statuslist.process?"Sedang memproses":"Mendaftar"}
					</Button>
				</form>

				<div className="text-center mt-2">
					Sudah punya akun? <Link to ="/login"><b>Masuk sekarang</b></Link>
				</div>

			</Card>
		</LayoutOne>
	);
}