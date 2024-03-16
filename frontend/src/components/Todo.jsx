import axios from "axios";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Todo = ({ todoitem, getTodos }) => {
  const { name, _id, completed } = todoitem;
  const [done, setDone] = useState(completed);

  const handleCheckboxChange = async () => {
    const newDone = !done;

    setDone(newDone);
    await axios
      .put(`https://mernstack-todo-64u6.onrender.com/todos/${_id}`, {
        completed: newDone,
      })
      .then((res) => {
        toast.info("Todo was changed succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await axios
      .delete(`https://mernstack-todo-64u6.onrender.com/todos/${_id}`)
      .then((res) =>
        toast.error(`Todo was deleted succesfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      )
      .catch((err) => {
        console.log(err);
      });
    getTodos();
  };
  return (
    <div className="w-full flex justify-between items-center text-yellow-50 p-3 gap-5">
      <div className="left-side flex gap-2">
        <input type="checkbox" onChange={handleCheckboxChange} checked={done} />
        <h1 className={`text-2xl ${done && "line-through"}`}>{name}</h1>
      </div>
      <FaTrash onClick={handleDelete} className="cursor-pointer text-2xl" />
    </div>
  );
};

export default Todo;
