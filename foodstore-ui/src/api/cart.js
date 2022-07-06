import axios from "axios";
import { config } from "../config";
import store from "../app/store";
import { setItem } from "../features/Cart/actions";

export async function saveCart(token, cart) {
  // console.log(cart);
  return await axios.put(
    `${config.api_host}/api/carts`,
    { items: cart },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getCart() {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  if (!token) return;

  let { data } = await axios.get(`${config.api_host}/api/carts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!data.error) {
    store.dispatch(setItem(data));
  }
}

// untuk menyimpan cart pada web api
