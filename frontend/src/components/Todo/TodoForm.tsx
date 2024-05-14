"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/ui-controls/Input";
import Button from "../../components/ui-controls/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { TodoPost } from "../../app/redux/actions/todoActions";
import Textarea from "../ui-controls/Textarea";
import Select from "../ui-controls/Select";

const TodoForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingPost } = useSelector((state: RootState) => state.todo);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
  }>({
    title: "",
    description: "",
    category: "personal",
  });

  const options = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "shopping", label: "Shopping" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (
    e: FormEvent<HTMLFormElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    if (formData.title === "" || formData.description === "") {
      return toast.error("All fields are required");
    }
    (async () => {
      try {
        dispatch(TodoPost(formData))
          .unwrap()
          .then(() => {
            toast.success("Todo created.");
            setFormData({ title: "", description: "", category: "work" });
          })
          .catch((err): any => {
            toast.error(
              Array.isArray(err.message) ? err.message[0] : err.message
            );
          });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container text-white space-y-6 md:w-[50%] my-8"
    >
      <Input
        className="focus:outline-none p-2 pl-2 rounded-md text-green-600 dark:text-green-300 focus:border-t-2 border-green-400 dark:bg-slate-800 w-full"
        id="title"
        name="title"
        type="text"
        placeholder="Add title"
        value={formData.title}
        onChange={handleChange}
      />
      <Textarea
        className="w-full p-2 rounded-md text-blue-600 dark:text-blue-300 focus:border-t-2 border-blue-600 dark:bg-slate-800  focus:outline-none"
        name="description"
        placeholder="description"
        value={formData.description}
        onChange={handleChange}
      />
      <Select
        className="w-full p-2 rounded-md text-gray-600 dark:text-blue-300 focus:border-t-2 border-blue-600 dark:bg-slate-800  focus:outline-none"
        title="Category"
        options={options}
        name="category"
        defaultVal={formData.category}
        value={formData.category}
        onChange={handleChange}
      />
      <Button
        disabled={loadingPost}
        type="submit"
        isFormLoading={loadingPost}
        text="Submit"
      />
    </form>
  );
};

export default TodoForm;
