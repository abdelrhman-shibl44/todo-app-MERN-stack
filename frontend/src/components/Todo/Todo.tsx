import React, { useState } from "react";
import { TodoItem } from "../../Types.common";
import Button from "../ui-controls/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { DeleteTodo, UpdateTodo } from "../../app/redux/actions/todoActions";
import { toast } from "react-toastify";

type Todos = {
  id: number;
} & TodoItem;

const Todo = (props: Todos) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loadingDel, setLoadingDel] = useState(false);
  const router = useRouter();

  const handleDelete = async (mongoId: string) => {
    try {
      setLoadingDel(true);
      await dispatch(DeleteTodo(mongoId))
        .unwrap()
        .then(() => {
          setLoadingDel(false);
          toast.success("Todo deleted");
        });
    } catch (err) {
      setLoadingDel(false);
      console.log(err);
    }
  };
  return (
    <tr className="bg-white/90 border text-left dark:bg-gray-800/80 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.id + 1}
      </th>
      <td
        className={`h-24 ${
          props.is_completed ? "line-through px-6 py-4" : "px-6 py-4"
        }`}
      >
        {props.title}
      </td>
      <td
        width="18.75rem"
        className={`min-w-[25rem] ${
          props.is_completed ? "line-through px-6 py-4" : "px-6 py-4"
        }`}
      >
        <div className="overflow-y-auto overflow-x-hidden scrollBar text-left flex items-center p-2 h-16">
          {props.description}
        </div>
      </td>
      <td
        className={`h-24 ${
          props.category ? "line-through px-6 py-4" : "px-6 py-4"
        }`}
      >
        {props.category}
      </td>
      <td className="px-6 py-4">
        {props.is_completed ? "Done 😇" : "pending"}
      </td>
      <td className="px-6 py-4 flex h-24 items-center gap-3">
        <Button
          disabled={loadingDel}
          isFormLoading={loadingDel}
          className="text-orange-400  hover:text-red-500 border border-orange-200 hover:border-red-400 py-1 px-4 transition-all"
          text="Delete"
          onClick={() => props._id && handleDelete(props._id)}
        />
        <Button
          disabled={props.is_completed}
          className={
            props.is_completed
              ? "text-gray-200 dark:text-gray-500 dark-gray-600 border border-gray-200 dark:border-gray-600 px-4"
              : "text-green-300  hover:text-green-500 border border-green-200 hover:border-green-400 py-1 px-4 transition-all"
          }
          text="Done"
          onClick={() =>
            dispatch(
              UpdateTodo({
                formData: { is_completed: true },
                todoId: props._id as string,
              })
            )
          }
        />
        {props._id && (
          <Button
            onMouseEnter={() => router.prefetch(`/auth/${props._id}/update`)}
            className={
              "text-blue-300 hover:text-blue-500 border border-blue-200 hover:border-blue-400 py-1 px-4 transition-all"
            }
            text="Update"
            onClick={() => router.push(`/auth/${props._id}/update`)}
          />
        )}
      </td>
    </tr>
  );
};

export default Todo;
