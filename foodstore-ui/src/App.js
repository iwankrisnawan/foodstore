// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import 'upkit/dist/style.min.css';

import store from './app/store';
import { listen } from './app/listener';
import { getCart } from './api/cart';

import Home from './pages/Home';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess/';
import Login from './pages/Login';
import UserAddressAdd from './pages/UserAddressAdd';
import UserAddress from './pages/UserAddress';
import Checkout from './pages/Checkout';
import Invoice from './pages/Invoice';
import UserAccount from './pages/UserAccount';
// import UserOrders from './pages/UserOrders';
import UserOrders from './pages/UserOrders';
import Logout from './pages/Logout';

import GuardRoute from './components/GuardRoute';
import GuestOnlyRoute from './components/GuestOnlyRoute';

function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />

            <Route path="/register/berhasil">
              <RegisterSuccess />
            </Route>

            <GuestOnlyRoute
              path="/register"
              component={Register}
            />

            <Route path="/alamat-pengiriman/tambah">
              <UserAddressAdd />
            </Route>

            <Route path="/alamat-pengiriman">
              <UserAddress />
            </Route>

            <Route path="/checkout">
              <Checkout />
            </Route>

            <Route path="/pesanan">
              <GuardRoute>
                <UserOrders />
              </GuardRoute>
            </Route>

            <Route path="/invoice/:order_id">
              <Invoice />
            </Route>

            <GuardRoute path="/account">
              <UserAccount />
            </GuardRoute>

            <Route path="/logout">
              <Logout />
            </Route>

            <Route path="/" component={Home} />
            {/*route ini harus di letakkan paling bawah*/}
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
