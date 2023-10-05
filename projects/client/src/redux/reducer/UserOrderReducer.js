import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    allUserOrder: [],
    orderItem: [],
    page: 1,
}

export const UserOrderReducer = createSlice({
    name: "UserOrderReducer",
    initialState,
    reducers: {
        setUserOrder: (state, action) => {
            state.allUserOrder = [...action.payload];
        },
        setOrderItem: (state, action) => {
            state.orderItem = [...action.payload];
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
});

export const getAllUserOrder = ({ index = 1, startDate, endDate, orderBy, order }) => {
    return async (dispatch) => {
        let query = `?page=${index}`;
        if (startDate) query += `&startDate=${startDate}`;
        if (endDate) query += `&endDate=${endDate}`;
        if (orderBy) query += `&orderBy=${orderBy}`;
        if (order) query += `&order=${order}`;
        try {
            const { data } = await axios.get(`${URL_API}/order/${query}`);
            dispatch(setPage(data.totalPage));
            dispatch(setUserOrder(data.data));
            dispatch(setOrderItem(data.data[0]?.id));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUserTransactionItem = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_API}/order/${id}`);
            dispatch(setOrderItem(data.data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const { setUserOrder, setOrderItem, setPage } = UserOrderReducer.actions;

export default UserOrderReducer.reducer;