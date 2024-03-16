import mongoose from "mongoose";

const todo = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", todo);
export default ToDo;
