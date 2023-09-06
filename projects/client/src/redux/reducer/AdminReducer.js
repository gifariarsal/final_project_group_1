import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  branchAdmin: {
    id: null,
    name: "",
    email: "",
    role_id: "",
  },
  login: false,
  admin: [],
};

export const AdminReducer = createSlice({
  name: "AdminReducer",
  initialState,
  reducers: {
    setBranchAdmin: (state, action) => {
      const { id, name, email, role_id } = action.payload;
      state.branchAdmin = { id, name, email, role_id };
    },
    loginSuccess: (state) => {
      state.login = true;
    },
    logoutSuccess: (state) => {
      state.login = false;
      setTimeout(() => {
        document.location.href = "/admin";
      }, 1000);
    },
  },
});

export const loginAdmin = (values, setLoading, toast) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const respon = await axios.post(`${URL_API}/admin`, {
        email: values.email,
        password: values.password,
      });
      console.log("ini respon", respon);
      const token = respon.data.token;
      localStorage.setItem("token", token);
      dispatch(setBranchAdmin(respon.data.Account));
      dispatch(loginSuccess());
      toast({
        title: "Login Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
};

export const logoutAdmin = (toast) => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch(logoutSuccess());
      toast({
        title: "Logout Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const keepLoginAdmin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.get(`${URL_API}/admin/keep`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setBranchAdmin(respon.data.findAdmin));
      dispatch(loginSuccess());
    } catch (error) {
      console.log(error);
    }
  };
};

export const createBranchAdmin = (value, toast) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/branch-admin`, value);
      toast({
        title: "Success",
        description: `${value.name} berhasil dibuat`,
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
    }
  };
};

export const { setBranchAdmin, loginSuccess, logoutSuccess } =
  AdminReducer.actions;

export default AdminReducer.reducer;
