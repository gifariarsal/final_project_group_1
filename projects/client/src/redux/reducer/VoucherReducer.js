import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  adminVoucher: [],
};

export const VoucherReducer = createSlice({
  name: "VoucherReducer",
  initialState,
  reducers: {
    setAdminVoucher: (state, action) => {
      state.adminVoucher = [...action.payload];
    },
  },
});

export const addVoucher = (values, toast, onClose, resetForm) => {
  return async () => {
    try {
      if (values.product_id === "") {
        values.product_id = null;
      }
      await axios.post(`${URL_API}/voucher`, values);
      toast({
        title: "Success",
        description: "Voucher has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: "Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const getAdminVoucher = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_API}/voucher/admin`);
      dispatch(setAdminVoucher(response.data.vouchers));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteVoucher = (id, toast) => {
  return async () => {
    try {
      await axios.patch(`${URL_API}/voucher/${id}`);
      toast({
        title: "Success",
        description: "Voucher has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: error?.response?.data?.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
}

export const { setAdminVoucher } = VoucherReducer.actions;

export default VoucherReducer.reducer;
