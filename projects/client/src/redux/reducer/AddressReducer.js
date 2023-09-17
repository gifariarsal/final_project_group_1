import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  address: [],
};

export const AddressReducer = createSlice({
  name: "AddressReducer",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = [...action.payload];
    },
  },
});

export const addAddress = (fullAddress, id, latitude, longitude, toast, onClose) => {
  return async () => {
    try {
      await axios.post(`${URL_API}/address`, {
        user_id: id,
        address: fullAddress,
        longitude,
        latitude,
      });
      toast({
        title: "Address Added",
        description: "Address has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const { setAddress } = AddressReducer.actions;

export default AddressReducer.reducer;
