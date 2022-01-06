import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'upkit/dist/style.min.css';
import Home from './pages/Home';
import { listen } from './app/listener';
import { Provider } from 'react-redux';

import GuestOnlyRoute from './components/GuestOnlyRoute';
import GuardRoute from './components/GuardRoute';
import Logout from './pages/Logout';
import UserOrders from './pages/UserOrders';
import UserAccount from './pages/UserAccount';
import Invoice from './pages/Invoice';
import Checkout from './pages/Checkout';
import UserAddress from './pages/UserAddress';
import UserAddressAdd from './pages/UserAddressAdd';
import UserAddressEdit from './pages/UserAddressEdit';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';
import store from './app/store';
import {getCart} from './api/cart';
import {EditProduct} from './pages/Product';
import {AddProduct} from './pages/Product/add';

function App() {

  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <GuardRoute path="/logout">
            <Logout/>
          </GuardRoute>
          <GuardRoute path="/pesanan">
            <UserOrders/>
          </GuardRoute>
          <GuardRoute path="/account">
            <UserAccount/>
          </GuardRoute>
          <GuardRoute path="/invoice/:order_id">
            <Invoice/>
          </GuardRoute>
          <GuardRoute path="/checkout">
            <Checkout/>
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman/tambah">
            <UserAddressAdd/>
          </GuardRoute>

          <GuardRoute path="/alamat-pengiriman">
            <UserAddress/>
          </GuardRoute>
          <GuardRoute path="/product/add">
            <AddProduct/>
          </GuardRoute>
          <GuardRoute path="/product/:id">
            <EditProduct/>
          </GuardRoute>
          <GuestOnlyRoute path="/register/berhasil">
            <RegisterSuccess/>
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/register">
            <Register/>
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/login">
            <Login/>
          </GuestOnlyRoute>
          <GuardRoute path="/">
            <Home/>
          </GuardRoute>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
