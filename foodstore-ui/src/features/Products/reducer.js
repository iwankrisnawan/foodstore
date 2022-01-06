import { 
  START_FETCHING_PRODUCT,
  ERROR_FETCHING_PRODUCT, 
  SUCCESS_FETCHING_PRODUCT, 
  SET_PAGE, 
  SET_CATEGORY,
  SET_KEYWORD,
  SET_TAGS,
  NEXT_PAGE, 
  PREV_PAGE,
  TOGGLE_TAG
} from './constants';

const statuslist = {
	idle:'idle',
	process:'process',
	success:'success',
	error:'error'
}

const initialState = {
	data: [], // untuk menyimpan item / produk dari server, default array kosong 
	currentPage: 1, // untuk menyimpan halaman aktif, default 1
	totalItems: -1, // total item / produk, default -1 alias belum diketahui 
	perPage: 6, // jumlah item untuk ditampilkan per halaman, default 6 
	keyword: '', // keyword untuk memfilter produk berdasarkan judul / nama produk 
	category: '', // kategori produk yang sedang aktif / menu item.
	tags: [], // tags produk yang sedang aktif 
	status: statuslist.idle // status request data produk ke server 
};


export default function reducer(state = initialState, action){
	switch(action.type){
		case START_FETCHING_PRODUCT:
			return {...state, status:statuslist.process};

		case SET_PAGE:
			return {...state, currentPage: action.currentPage};

		case SET_CATEGORY:
			return {...state, currentPage:1, tags:[], category:action.category, keyword:''};

		case SET_KEYWORD:
			return {...state, keyword:action.keyword, category:'', tags :[] };

		case SET_TAGS:
			return {...state, tags:action.tags};

		case TOGGLE_TAG: 
			if (!state.tags.includes(action.tags)) {
				return {...state, currentPage:1, 
						tags: [...state.tags, action.tags]}
			}
			else{
				return {...state, currentPage:1, 
						tags:state.tags.filter(tag => tag !== action.tag)}
						// filter untuk menghapus
			}

		case NEXT_PAGE:
			return {...state, currentPage: state.currentPage + 1};

		case PREV_PAGE:
			return {...state, currentPage: state.currentPage - 1};


		case ERROR_FETCHING_PRODUCT:
			return {...state, status:statuslist.error};

		case SUCCESS_FETCHING_PRODUCT:
			return {...state, 
					status:statuslist.success, 
					data:action.data, 
					totalItems:action.count
				}
				// acter success then, change value of status, data and totalItems
				// in variabel statuslist 

		default:
			return state;
	}
}