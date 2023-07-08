"use client"
import { ITask } from "@/types/types";
import React, { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Modal from "./Modal";
import { addTodo, deleteTodo, editTodo } from "@/api";
import { useRouter } from 'next/navigation'


interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {

  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleEdit : FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDelete = async (id:string) => {
    // e.preventDefault()
    await deleteTodo(id)
    setOpenModalDeleted(false)
    router.refresh()
  }

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit size={20} className="text-blue-500 cursor-pointer" onClick={()=>setOpenModalEdit(true)} />
        <Modal modelOpen={openModalEdit} setModelOpen={setOpenModalEdit}>
          <form onSubmit={handleEdit}>
            <h3 className="font-bold text-lg text-center">Edit task</h3>
            <div className="model-action mt-2">
              <input
                value={taskToEdit}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setTaskToEdit(e.target.value)}
              />{" "}
              <button className="btn btn-success mx-2 w-24" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash size={20} className="text-red-500 cursor-pointer" onClick={()=>setOpenModalDeleted(true)} />
        <Modal modelOpen={openModalDeleted} setModelOpen={setOpenModalDeleted}>
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="model-action mt-2 ">
            <button className="btn btn-error w-16 " onClick={()=> handleDelete(task.id)}>Yes</button>
            <button className="btn btn-neutral mx-2 w-16" onClick={()=>setOpenModalDeleted(false)}>No</button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
