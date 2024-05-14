"use client";

import React, { useEffect, useState } from "react";
import Input from "../ui-controls/Input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { TodosGet } from "@/app/redux/actions/todoActions";

const TodoFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  interface CategoriesState {
    work: boolean;
    personal: boolean;
    shopping: boolean;
  }
  const [categories, setCategories] = useState<CategoriesState>({
    work: false,
    personal: false,
    shopping: false,
  });

  const cates: string[] = Object.keys(categories).filter(
    (category) => categories[category as keyof CategoriesState]
  );
  useEffect(() => {
    dispatch(TodosGet({ cates }));
  }, [cates]);

  const handleCheckboxChange = (category: keyof CategoriesState) => {
    // Update categories state
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-800 p-2 flex">
      <h1 className="font-bold italic">Todo Filter</h1>
      <div className="flex items-center pl-8 lg:pl-16 gap-4 lg:gap-16 dark:text-white">
        <label className="text-center cursor-pointer">
          <Input
            type="checkbox"
            checked={categories.work}
            onChange={() => handleCheckboxChange("work")}
          />
          Work
        </label>
        <label className="text-center cursor-pointer">
          <Input
            type="checkbox"
            checked={categories.personal}
            onChange={() => handleCheckboxChange("personal")}
          />
          Personal
        </label>
        <label className="text-center cursor-pointer">
          <Input
            type="checkbox"
            checked={categories.shopping}
            onChange={() => handleCheckboxChange("shopping")}
          />{" "}
          Shopping
        </label>
      </div>
    </div>
  );
};

export default TodoFilter;
