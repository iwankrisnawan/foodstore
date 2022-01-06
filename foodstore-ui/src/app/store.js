import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../features/Auth/reducer';

import productReducer from '../features/Products/reducer';
import cartReducer from '../features/Cart/reducer';

// membuat composer ecnhancer untuk menghubungkan dengan chrome devtools redux
const composerEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// gabung reducer, untuk sementara kosong, karena kita belum membuat reducer
const rootReducers = combineReducers({
	auth:authReducer,
	products: productReducer,
	cart:cartReducer
});

const store = createStore(rootReducers, composerEnchancer(applyMiddleware(thunk)));

export default store;
