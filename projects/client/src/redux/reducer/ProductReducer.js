import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  product: [],
  store_id: null,
  page: 1,
  cart: [],
  totalHarga : 0,
};

export const ProductReducer = createSlice({
  name: "ProductReducer",
  initialState,
  reducers: {
    addToCart : (state, action) => {
      const {id} = action.payload
      console.log("redux cart => ", action.payload)
      console.log("carts ", state.cart)
      const existCart = state.cart.findIndex((item) => item.id === id)
      if(existCart !== -1){
        state.cart[existCart].quantity += 1
      }else {
        state.cart.push({ ...action.payload, quantity : 1})
      }
      state.totalHarga += action.payload.price
    },
    deleteFromCart: (state, action) => {
      const { id } = action.payload;

      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        console.log("=>", state.cart[existCart].quantity);
        if (state.cart[existCart].quantity > 0) {
          state.cart[existCart].quantity -= 1;
          state.totalHarga -= action.payload.price;
        }
      }
    },
    setProduct: (state, action) => {
      state.product = [...action.payload];
    },
    setStore_id: (state, action) => {
      state.store_id = action.payload;
    },
  },
});

export const getProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/product`);
      console.log(data.data);
      dispatch(setProduct(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};


export const getStoreProduct = ({ userLocation, lat, lon }) => {
  return async (dispatch) => {
    try {
      // const { data } = await axios.get(`${URL_API}/store/?location=${userLocation.state}`);
      const { data } = await axios.get(`${URL_API}/store/nearest/?lat=${lat} &lon=${lon}`);
      dispatch(setStore_id(data.data.id));
      const products = await axios.get(`${URL_API}/product/store/?store_id=${data.data.id}`);
      dispatch(setProduct(products.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const addCart = (cartData) => {
  return async (dispatch) => {
    console.log("cartData => ", cartData)
    const total_price = cartData.total_price
    console.log("price ", total_price)
    const token = localStorage.getItem("token")
    try {
      const result = await axios.patch("http://localhost:8000/api/product/cart", {total_price}, 
      {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const { setProduct, setStore_id, addToCart, deleteFromCart } = ProductReducer.actions;
export default ProductReducer.reducer;
