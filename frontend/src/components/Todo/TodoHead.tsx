import React from "react";

const TodoHead = () => {
  return (
    <tr>
      <th scope="col" className="px-6 py-3">
        id
      </th>
      <th scope="col" className="px-6 py-3">
        Title
      </th>
      <th scope="col" className="px-6 py-3">
        Description
      </th>
      <th scope="col" className="px-6 py-3">
        Category
      </th>
      <th scope="col" className="px-6 py-3">
        Status
      </th>
      <th scope="col" className="px-6 py-3">
        Action
      </th>
    </tr>
  );
};

export default TodoHead;
