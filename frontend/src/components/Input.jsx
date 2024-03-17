import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [changinCharacters, setChanginCharacters] = useState(0);
  const [maxCharacters, setMaxCharacters] = useState(30);

  const handleChange = (e) => {
    setChanginCharacters(e.target.value.length);
    if (changinCharacters <= maxCharacters) {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      name: inputValue,
    };
    await axios.post("https://mernstack-todo-64u6.onrender.com/todos", newTodo);
    toast.success("Todo was created succesfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setInputValue("");
    setChanginCharacters(0);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-3">
      <div className="flex justify-between">
        <input
          type="text"
          className="w-80 rounded-xl px-2 text-lg"
          value={inputValue}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white rounded-lg cursor-pointer  hover:shadow-xl "
        >
          Add New ToDo
        </button>
      </div>
      <div className="text-left text-red-300">
        {changinCharacters >= maxCharacters
          ? "* Maximum character should be 30"
          : " "}
      </div>
    </form>
  );
};

export default Input;
