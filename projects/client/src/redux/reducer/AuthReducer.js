import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;
const KEY = process.env.REACT_APP_KEY;

const initialState = {
  user: {
    id: null,
    username: "",
    name: "",
    birthdate: "",
    email: "",
    gender: "",
    profileimg: "",
    refcode: "",
    refby: "",
    // confirmPassword: ""
  },
  login: false,
  location: null,
};

export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("isi", action.payload);
      const { id, username, name, birhdate, email, gender, profileimg, refcode, refby } = action.payload;
      state.user = { id, username, name, birhdate, email, gender, profileimg, refcode, refby };
    },
    loginSuccess: (state, action) => {
      // state.user = {...action.payload};
      state.login = true;
      // localStorage.setItem("token", action.payload);
    },
    logoutSuccess: (state) => {
      // state.user = initialState.user;
      state.login = false;
      setTimeout(() => {
        document.location.href = "/";
      }, 1000);
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const logoutAuth = (toast) => {
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
export const registerUser = (value, toast) => {
  return async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/user`, value);
      console.log(data);
      toast({
        title: "Register Success",
        description: `${value.username} berhasil dibuat`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast({
        title: "Register Gagal",
        description: error.response.data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const loginAuth = (values, setLoading, toast) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const respon = await axios.post(`${URL_API}/auth/auth`, {
        email: values.email,
        password: values.password,
      });
      console.log("ini respon", respon);
      // dispatch(setUser())
      const token = respon.data.token;
      localStorage.setItem("token", token);
      dispatch(setUser(respon.data.Account));
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
        title: "Login Failedd",
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

export const keepLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.get(`${URL_API}/auth/keep`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(respon.data.findUser));
      dispatch(loginSuccess());
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserLocation = (latitude, longitude) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${KEY}`
      );
      const foundLocation = data.results;
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].components.city) {
          dispatch(setLocation(data.results[i].components));
          break;
        } else throw new Error("Location not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const { loginSuccess, logoutSuccess, setUser, setLocation } = AuthReducer.actions;

export default AuthReducer.reducer;
