"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import Input from "../../components/ui-controls/Input";
import Button from "../../components/ui-controls/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { TodoGet, UpdateTodo } from "../../app/redux/actions/todoActions";
import { useParams } from "next/navigation";
import Select from "../ui-controls/Select";
import Textarea from "../ui-controls/Textarea";

const UpdateForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(TodoGet(id as string));
  }, []);

  const { id } = useParams();
  const todo = useSelector((state: RootState) => state.todo.selectedTodo);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    is_completed: boolean;
    category: string | string[]; // Change this to match your state
  }>({
    title: todo?.title || "",
    description: todo?.description || "",
    is_completed: todo?.is_completed || false,
    category: todo?.category || "",
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo?.title || "",
        description: todo?.description || "",
        is_completed: todo?.is_completed || false,
        category: todo?.category || "",
      });
    }
  }, [todo]);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const options = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "shopping", label: "Shopping" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    // Check if the input element is a checkbox
    const isCheckBox =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckBox,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title === "" || formData.description === "") {
      return toast.error("All fields are required");
    }
    // Check if the form data is the same as the initial data
    if (
      formData.title === todo?.title &&
      formData.description === todo?.description &&
      formData.is_completed === todo?.is_completed &&
      formData.category === todo?.category
    ) {
      return toast.error("No changes made.");
    }
    (async () => {
      try {
        setLoading(true);
        await dispatch(UpdateTodo({ formData, todoId: id as string }))
          .unwrap()
          .then(() => {
            setLoading(false);
            toast.success("Todo updated.");
            dispatch(TodoGet(id as string));
          })
          .catch((err): any => {
            setLoading(false);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        className="focus:outline-none p-2 pl-2 rounded-md text-green-600 dark:text-green-300 focus:border-t-2 border-green-400 dark:bg-slate-800 w-full"
        id="title"
        name="title"
        inputRef={inputRef}
        type="text"
        placeholder="Update title"
        value={formData.title}
        onChange={handleChange}
      />
      <Textarea
        className="w-full p-2 rounded-md text-blue-600 dark:text-blue-300 focus:border-t-2 border-blue-600 dark:bg-slate-800  focus:outline-none"
        name="description"
        placeholder="Update description"
        value={formData.description}
        onChange={handleChange}
      />
      <Select
        className="w-full p-2 rounded-md text-gray-600 dark:text-blue-300 focus:border-t-2 border-blue-600 dark:bg-slate-800  focus:outline-none"
        title="Category"
        options={options}
        name="category"
        defaultVal={todo?.category}
        value={formData.category}
        onChange={handleChange}
      />
      <div className="flex items-center">
        <label
          htmlFor="isComplete"
          className="dark:text-blue-100 font-medium w-16"
        >
          Status:
        </label>
        <Input
          className="focus:outline-none p-2 pl-2 rounded-md text-green-600 dark:text-green-300 focus:border-t-2 border-green-400 dark:bg-slate-800 cursor-pointer"
          id="isComplete"
          name="is_completed"
          type="checkbox"
          checked={formData.is_completed}
          onChange={handleChange}
        />
      </div>
      <Button
        isFormLoading={loading}
        disabled={loading}
        type="submit"
        text="Submit"
      />
    </form>
  );
};

export default UpdateForm;
