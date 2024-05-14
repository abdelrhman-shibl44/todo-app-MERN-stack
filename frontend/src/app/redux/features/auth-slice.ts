// src/reducers/authSlice.ts
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { AuthLogin, AuthRegister } from "../actions/authActions";
import { AuthState } from "../types";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    token: "",
    linkedinData: {
      name: "",
      title: "",
      photoUrl: "",
    },
  },
  loading: false,
  isAuth: false,
  error: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(AuthRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AuthRegister.fulfilled, (state, action) => {
      state.user!.token = action.payload;
      state.loading = false;
    });
    builder.addCase(AuthRegister.rejected, (state, action) => {
      state.loading = false;
      const payLoad = action.payload as { message: string };
      state.error = payLoad?.message || "An error occurred";
    });
    builder.addCase(AuthLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AuthLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = true;
    });
    builder.addCase(AuthLogin.rejected, (state, action) => {
      state.loading = false;
      const payLoad = action.payload as { message: string };
      state.error = payLoad?.message || "An error occurred";
    });
  },
});

export { AuthRegister };
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
