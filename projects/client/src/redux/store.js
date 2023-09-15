import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import ProductReducer from "./reducer/ProductReducer";
import AdminReducer from "./reducer/AdminReducer";
import CartReducer from "./reducer/CartReducer";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    ProductReducer: ProductReducer,
    AdminReducer: AdminReducer,
    CartReducer : CartReducer
  },
});
