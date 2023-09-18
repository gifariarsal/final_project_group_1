import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  address: [],
  userAddress: [],
};

export const AddressReducer = createSlice({
  name: "AddressReducer",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = [...action.payload];
    },
    setUserAddress: (state, action) => {
      state.userAddress = [...action.payload];
    },
  },
});

export const addAddress = (
  fullAddress,
  id,
  latitude,
  longitude,
  toast,
  onClose
) => {
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

export const getAddress = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_API}/address/${id}`);
      dispatch(setUserAddress(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteAddress = (address_id, toast) => {
  return async () => {
    try {
      await axios.patch(`${URL_API}/address/deactivate/${address_id}`);
      toast({
        title: "Success",
        description: "Address has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: error.response.data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };
};

export const editAddress = (address_id, id, fullAddress, latitude, longitude, toast, onClose) => {
  return async () => {
    try {
      await axios.patch(`${URL_API}/address/${address_id}`, {
        user_id: id,
        address: fullAddress,
        longitude,
        latitude,
      });
      toast({
        title: "Success",
        description: "Address has been updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed",
        description: error.response.data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const { setAddress, setUserAddress } = AddressReducer.actions;

export default AddressReducer.reducer;
