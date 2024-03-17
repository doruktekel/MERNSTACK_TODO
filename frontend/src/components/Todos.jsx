import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";
import Swal from "sweetalert2";
import Input from "./Input";

const ToDos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    await axios
      .get("https://mernstack-todo-64u6.onrender.com/todos")
      .then((res) => {
        setLoading(false);
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAllTodos = async () => {
    const result = await Swal.fire({
      title: "Are you sure to delete all todos ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete("https://mernstack-todo-64u6.onrender.com/todos");
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        await getTodos();
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleDeleteCompletedTodos = async () => {
    const result = await Swal.fire({
      title: "Are you sure to delete completed todos ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const completedTodos = todos.filter((todo) => todo.completed === true);
        await Promise.all(
          completedTodos.map((item) =>
            axios.delete(
              `https://mernstack-todo-64u6.onrender.com/todos/${item._id}`
            )
          )
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        await getTodos();
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <Input getTodos={getTodos} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col gap-5">
          {todos && todos.length > 0
            ? todos.map((todoitem) => {
                return (
                  <Todo
                    key={todoitem._id}
                    todoitem={todoitem}
                    getTodos={getTodos}
                  />
                );
              })
            : null}
        </div>
      )}
      {todos && todos.length > 1 ? (
        <div className="flex justify-center align-middle gap-10 m-5">
          <button
            onClick={handleDeleteAllTodos}
            className="px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer border-2 border-indigo-400 hover:shadow-xl hover:bg-transparent  transition ease-in-out delay-150  "
          >
            Delete All ToDos
          </button>
          <button
            onClick={handleDeleteCompletedTodos}
            className="px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer border-2 border-indigo-400 hover:shadow-xl hover:bg-transparent  transition ease-in-out delay-150  "
          >
            Delete Completed ToDos
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ToDos;
