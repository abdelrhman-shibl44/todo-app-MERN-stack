import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginIn, signUp } from "../api";
import { TAuthLogin, TAuthRegister } from "../types";

const AuthRegister = createAsyncThunk(
  "auth/signup",
  async (formData: TAuthRegister, { rejectWithValue }) => {
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
  async (formData: TAuthLogin, { rejectWithValue }) => {
    try {
      const { data } = await loginIn(formData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { AuthRegister, AuthLogin };
