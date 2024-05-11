import axios from "axios";
import { FormData } from "./types";

const API = axios.create({ baseURL: "http://localhost:3001" });
// authentication
export const loginIn = (formData: FormData) =>
  API.post("/auth/login", formData);

export const signUp = (formData: FormData) =>
  API.post("/auth/signup", formData);
