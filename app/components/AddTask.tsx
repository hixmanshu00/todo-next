"use client";
// import { AiOutlinePlus } from 'react-icons/ai'
import Modal from "./Modal";
import { useState, FormEventHandler } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

{
  /* <AiOutlinePlus className='bg-primary ml-2' size={16} /> */
}

const AddTask = () => {
  const router = useRouter();
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTask,
    });
    setNewTask("");
    setModelOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button
        className="btn btn-primary w-full"
        onClick={() => setModelOpen(true)}
      >
        Add New Task{" "}
      </button>
      <Modal modelOpen={modelOpen} setModelOpen={setModelOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg text-center">Add a new task</h3>
          <div className="model-action mt-2">
            <input
              value={newTask}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setNewTask(e.target.value)}
            />{" "}
            <button className="btn btn-success mx-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
