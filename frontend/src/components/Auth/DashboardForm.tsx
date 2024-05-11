"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import Input from "../ui-controls/Input";
import Button from "../ui-controls/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { redirect } from "next/navigation";

const DashboardForm = () => {
  const { user, isAuth } = useSelector((state: RootState) => state.auth);

  useLayoutEffect(() => {
    if (!isAuth) {
      redirect("/auth/login");
    }
  }, [isAuth]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
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
    if (user?.name == formData.name && user?.email == formData.email) {
      return toast.error("Please change your info first.");
    }
    try {
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="name"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Type Your New Name"
        disable={true}
      />
      <Input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Type Your New Email"
        disable={true}
      />

      <Button
        type="submit"
        disabled={true}
        isFormLoading={false}
        text="Update"
      />
    </form>
  );
};

export default DashboardForm;
