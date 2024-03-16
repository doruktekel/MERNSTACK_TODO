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

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <div className="flex flex-col gap-5">
      {todos && todos.length > 0
        ? todos.map((todoitem, index) => {
            return <Todo key={index} todoitem={todoitem} getTodos={getTodos} />;
          })
        : null}
    </div>
  );
};

export default ToDos;
