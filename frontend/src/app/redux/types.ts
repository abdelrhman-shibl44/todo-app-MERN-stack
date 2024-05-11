// authentication
export type AuthRegister = {
  name: string;
  email: string;
  password: string;
};

export type AuthLogin = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  token: string | null;
};

export type AuthState = {
  loading: boolean;
  user: User | null;
  isAuth: boolean;
  error: string[] | string | null;
};

export type FormData = {
  email: string;
  password: string;
};
