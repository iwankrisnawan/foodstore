import React from 'react';
import {LayoutOne, InputText, FormControl, Textarea, Button} from 'upkit';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import SelectWilayah from '../../components/SelectWilayah';
import { createAddress } from '../../api/address';
import {rules} from './validation';

export default function UserAddressAdd(){
	let history = useHistory();
	let {handleSubmit, register, errors, setValue, watch, getValues} = useForm();

	let allFields = watch();

	React.useEffect(() => {
		register({name: 'provinsi'}, rules.provinsi);
		register({name: 'kabupaten'}, rules.kabupaten);
		register({name: 'kecamatan'}, rules.kecamatan);
		register({name: 'kelurahan'}, rules.kelurahan);
	}, [register]);

	React.useEffect(() => {
		setValue('kabupaten', null);
		setValue('kecamatan', null);
		setValue('kelurahan', null);
	}, [allFields.kabupaten, setValue]) // <- deps allFields.kabupaten

	React.useEffect(() => {
		setValue('kecamatan', null);
		setValue('kelurahan', null);
	}, [allFields.kabupaten, setValue]) // <- deps allFields.kabupaten

	React.useEffect(() => {
		setValue('kabupaten', null); 
		setValue('kecamatan', null); 
		setValue('kelurahan', null);
	}, [allFields.provinsi, setValue]) // <- deps allFields.provinsi

	React.useEffect(() => {
		setValue('kelurahan', null);
	}, [allFields.kecamatan, setValue]) // <- deps allFields.kecamatan

	const updateValue = 
		(field, value) => setValue(field, value, {shouldValidate:true, shouldDirty: true})

	const onSubmit = async formData => {
		let payload = {
			nama:formData.nama_alamat,
			detail:formData.detail_alamat,
			provinsi: formData.provinsi.label,
			kabupaten: formData.kabupaten.label,
			kecamatan: formData.kecamatan.label,
			kelurahan: formData.kelurahan.label
		}

		let {data} = await createAddress(payload);

		if(data.error) return;

		history.push('/alamat-pengiriman');
	}
	
	return (
		<LayoutOne>
			<TopBar/>
			<br/>

			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl label="Nama alamat" errorMessage ={errors.nama_alamat?.message} color="black">
						<InputText
							placeholder ="nama alamat"
							fitContainer
							nama="nama_alamat"
							ref={register(rules.nama_alamat)}
						/>
					</FormControl>

					<FormControl label="Kabupaten/kota" errorMessage= {errors.kabupaten?.message} color="black">
						<SelectWilayah 
							tingkat = "kabupaten"
							kodeInduk = {getValues().provinsi?.value}
							onChange ={option => updateValue('kabupaten', option)}
							value ={getValues().kabupaten}
						/>
					</FormControl>

					<FormControl label="Kecamatan" errorMessage={errors.kecamatan?.message}>
						<SelectWilayah 
							tingkat = "kecamatan"
							kodeInduk = {getValues().kabupaten?.value}
							onChnage = {option => updateValue('kecamatan', option)}
							value = {getValues().kecamatan}
						/>
					</FormControl>

					<FormControl label ="Kelurahan" errorMessage = {errors.kelurahan?.message}>
						<SelectWilayah
							tingkat = "desa"
							kodeInduk = {getValues().kecamatan?.value}
							onChnage = {option => updateValue('kelurahan', option)}
							value = {getValues().kelurahan}
						/>
					</FormControl>

					<FormControl label = "detail alamat" errorMessage ={errors.detail_alamat?.message}>
						<Textarea
							placeholder = "Detail alamat"
							fitContainer
							name ="detail_alamat"
							ref ={register(rules.detail_alamat)}
						/>
					</FormControl>

					<Button fitContainer>
						Simpan
					</Button>
				</form>
			</div>
		</LayoutOne>
	)
}