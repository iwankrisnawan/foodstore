import { 
  SUCCESS_FETCHING_PRODUCT, 
  START_FETCHING_PRODUCT, 
  ERROR_FETCHING_PRODUCT, 
  SET_PAGE, 
  SET_KEYWORD, 
  SET_CATEGORY,
  SET_TAGS,
  TOGGLE_TAG,
  PREV_PAGE,
  NEXT_PAGE
} from './constants';

import {getProducts} from '../../api/product';
import debounce from 'debounce-promise';

let debouncedFetchProducts  = debounce(getProducts, 500);
//melakukan pemanggilan setiap detik, kecuali jika user mengetik 

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		
		// let {data: {data, count} } = await debouncedFetchProducts({})

		// dispatch(startFetchingProducts());
		// dispatch `startFetchingProducts` menandakan _request_ produk dimulai

		let perPage = getState().products.perPage || 9;
		let currentPage = getState().products.currentPage || 1;
		let tags = getState().products.tags || [];
		let keyword = getState().products.keyword || '';
		let category = getState().products.category || '';

		const params = {
			limit:perPage,
			skip: (currentPage * perPage) - perPage,
			q:keyword,
			tags,
			category
		}

		try {
			let {data: {data, count} } = await debouncedFetchProducts(params);

			dispatch(successFetchingProducts({data,count}));
		} catch(error) {
			dispatch(errorFetchingProducts())
		}
	}
}
// untuk mendapatkan nilai data yang terbaru

export const startFetchingProducts = () => {
	return{
		type: START_FETCHING_PRODUCT
	}
}

export const errorFetchingProducts = () => {
	return {
		type: ERROR_FETCHING_PRODUCT
	}
}

export const successFetchingProducts = (payload) => {
	return {
		type: SUCCESS_FETCHING_PRODUCT,
		...payload
	}
}

export const setPage = (number =  1) => {
	return {
		type: SET_PAGE,
		currentPage: number
	}
}

export const setKeyword = keyword => {
	return {
		type: SET_KEYWORD,
		keyword
	}
}

export const setCategory = category => {
	return {
		type: SET_CATEGORY,
		category
	}
}

export const setTags = tags => {
	return {
		type: SET_TAGS,
		tags
	}
}

export const toggleTag = tag => {
	return{
		type: TOGGLE_TAG,
		tag
	}
}

export const goToNextPage = () => {
	return{
		type: NEXT_PAGE
	}
}

export const goToPrevPage = () => {
	return {
		type: PREV_PAGE
	}
}