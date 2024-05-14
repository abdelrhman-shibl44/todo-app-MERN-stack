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

const ProfileForm = () => {
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  useLayoutEffect(() => {
    if (!isAuth) {
      redirect("/auth/login");
    }
  }, [isAuth]);

  const [formData, setFormData] = useState({
    name: user?.linkedinData?.name || user?.name || "",
    title: user?.linkedinData?.title || user?.email || "",
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
    if (
      user?.linkedinData?.name == formData.name &&
      user?.linkedinData?.title == formData.title
    ) {
      return toast.error("Please change your info first.");
    }
    try {
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {user?.linkedinData.photoUrl && (
        <div className="flex justify-center rounded-full items-center gap-4">
          <img
            className="rounded-full w-28 h-28"
            src={user.linkedinData.photoUrl}
            alt="LinkedIn Image"
          />
        </div>
      )}
      <Input
        type="name"
        name="title"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Type Your New Name"
        disable={true}
      />
      <Input
        type="text"
        name="text"
        id="text"
        value={formData.title}
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

export default ProfileForm;
