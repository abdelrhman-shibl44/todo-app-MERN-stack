import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginIn, signUp } from "../api";
import { AuthLogin, AuthRegister } from "../types";

const AuthRegister = createAsyncThunk(
  "auth/signup",
  async (formData: AuthRegister, { rejectWithValue }) => {
    try {
      const { data } = await signUp(formData);
      return data.token;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const AuthLogin = createAsyncThunk(
  "auth/login",
  async (formData: AuthLogin, { rejectWithValue }) => {
    try {
      const { data } = await loginIn(formData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { AuthRegister, AuthLogin };
