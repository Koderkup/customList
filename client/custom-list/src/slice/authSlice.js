import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem("auth", action.payload.token); 
    },
    registerFailure: (state, action) => {
      state.error = action.payload.error;
      window.alert(action.payload.error);
    },
  },
});

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/user/registration", userData);
    const token = response.data.token;
    const decodedToken = jwt_decode(token);
    const user = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      token: token,
    };
    dispatch(registerSuccess(user));
  } catch (error) {
    const errorMessage = error.response.data.msg || "Произошла ошибка";
    dispatch(registerFailure({ error: errorMessage }));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/user/login", userData);
    const token = response.data.token;
    const decodedToken = jwt_decode(token);
    const user = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      token: token,
    };
    dispatch(registerSuccess(user));
  } catch (error) {
    const errorMessage = error.response.data.msg || "Произошла ошибка";
    dispatch(registerFailure({ error: errorMessage }));
  }
};

export const { registerSuccess, registerFailure } = authSlice.actions;

export default authSlice.reducer;
