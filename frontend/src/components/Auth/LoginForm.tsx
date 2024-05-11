"use client";

import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useState,
} from "react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Input from "../ui-controls/Input";
import Button from "../ui-controls/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { AuthLogin } from "../../app/redux/actions/authActions";
import { RootState } from "../../app/redux/store";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, isAuth } = useSelector((state: RootState) => state.auth);

  useLayoutEffect(() => {
    if (isAuth) {
      redirect("/dashboard");
    }
  }, [isAuth]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return toast.error("All fields are required");

    dispatch(AuthLogin(formData))
      .unwrap()
      .then((action) => {
        localStorage.setItem("token", JSON.stringify(action.user.token));
        router.push("/");
        toast.success("Login successfully.");
      })
      .catch((err): any => {
        toast.error(Array.isArray(err.message) ? err.message[0] : err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          onChange={handleChange}
          value={formData.password}
        />
        <span className="text-center dark:text-slate-50">
          Don&apos;t have an account?
          <Link
            className="text-blue-500 border-b-2 border-blue-500"
            href="/auth/register"
          >
            {" "}
            Register
          </Link>
        </span>
        <Button
          type="submit"
          className={`w-fit mx-auto bg-slate-100 hover:shadow-lg shadow-slate-900  dark:bg-slate-700  text-slate-700 dark:text-white font-semibold p-2 px-6 rounded-md ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
          isFormLoading={loading}
          text="Submit"
        />
      </form>
    </>
  );
};

export default LoginForm;
