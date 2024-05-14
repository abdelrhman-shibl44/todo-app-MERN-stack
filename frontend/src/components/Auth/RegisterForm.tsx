"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import Input from "../ui-controls/Input";
import Button from "../ui-controls/Button";
import { useDispatch, useSelector } from "react-redux";
import { AuthRegister } from "@/app/redux/actions/authActions";
import { AppDispatch } from "@/app/redux/store";
import { RootState } from "../../app/redux/store";
const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, isAuth } = useSelector((state: RootState) => state.auth);

  useLayoutEffect(() => {
    if (isAuth) {
      redirect("/dashboard");
    }
  }, [isAuth]);

  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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
    const { name, email, password } = formData;
    if (!name || !email || !password)
      return toast.error("All fields are required");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return setFormError("invaild email");
    }
    dispatch(AuthRegister({ name, email, password }))
      .unwrap()
      .then(() => {
        router.push("/auth/login");
        toast.success("Registered successfully.");
      })
      .catch((err) => {
        toast.error(Array.isArray(err.message) ? err.message[0] : err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <Input
        type="name"
        name="name"
        id="name"
        placeholder="Enter your Name (as on LinkedIn)"
        onChange={handleChange}
        value={formData.name}
      />
      <Input
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
      <p className="text-red-500 font-semibold text-sm">
        {formError.length > 0 && formError}
      </p>
      <span className="text-center dark:text-slate-50">
        Already have an account?
        <Link
          className="text-blue-500 border-b-2 border-blue-500"
          href="/auth/login"
        >
          {" "}
          Login
        </Link>
      </span>
      <Button
        type="submit"
        disabled={loading}
        isFormLoading={loading}
        className={`w-fit mx-auto hover:shadow-lg shadow-slate-900 transition-shadow duration-300
        bg-slate-100 dark:bg-slate-700  text-slate-700 dark:text-white font-semibold p-2 px-6 rounded-md ${
          loading ? "opacity-50" : ""
        }`}
        text="Submit"
      />
    </form>
  );
};

export default RegisterForm;
