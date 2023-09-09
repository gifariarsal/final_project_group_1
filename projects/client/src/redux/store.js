import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import ProductReducer from "./reducer/ProductReducer";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    ProductReducer: ProductReducer,
  },
});
