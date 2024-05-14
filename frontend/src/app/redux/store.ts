import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import todoReducer from "./features/todo-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
