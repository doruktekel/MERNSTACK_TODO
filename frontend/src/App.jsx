import ToDos from "../src/components/Todos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="grid place-content-center w-full h-dvh bg-slate-700 ">
      <div className="flex flex-col gap-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 rounded-3xl text-center max-w-xl overflow-hidden shadow-2xl">
        <h1 className="text-5xl  text-white ">Welcome Todo List</h1>
        <ToDos />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
