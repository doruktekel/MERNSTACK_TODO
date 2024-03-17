import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";

const ToDos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    await axios
      .get("https://mernstack-todo-64u6.onrender.com/todos")
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAllTodos = () => {};
  const handleDeleteCompletedTodos = () => {};

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        {todos && todos.length > 0
          ? todos.map((todoitem, index) => {
              return (
                <Todo key={index} todoitem={todoitem} getTodos={getTodos} />
              );
            })
          : null}
      </div>
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
    </div>
  );
};

export default ToDos;
