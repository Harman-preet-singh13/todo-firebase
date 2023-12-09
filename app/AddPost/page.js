"use client";

import { useState } from "react";
import { database } from "../firebase";
import { ref, push, set } from "firebase/database";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AddTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const router = useRouter();
  const { user } = UserAuth();

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (taskTitle.trim() !== "") {
      if (user) {
        const tasksRef = ref(database, `tasks/${user.uid}`);
        const newTaskRef = push(tasksRef);

        // Set task details
        await set(newTaskRef, {
          id: newTaskRef.key,
          title: taskTitle,
          completed: false,
        });

        toast.success("Task added Successfully. Redirecting to Home page");

        setTaskTitle("");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    }
  };

  return (
    <div className="h-[65vh] flex justify-center items-center">
      <Toaster />
      <form
        onSubmit={(e) => handleAddTask(e)}
        className="w-full flex flex-col "
      >
        <input
          type="text"
          placeholder="Enter task title"
          className="mx-1 md:mx-20 py-3 px-2 
        rounded-xl border-2
         border-slate-500 shadow-lg 
         grow shrink-0
          outline-none
          input-bg-color
          focus:border-zinc-400
         "
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />

        {user ? (
          <button
            className="mt-5 mx-auto w-36 px-2 py-2 
      rounded-lg font-semibold border-2 border-zinc-400 
      hover:bg-zinc-400 hover:text-zinc-700
      "
            type="submit"
          >
            Add Task
          </button>
        ) : (
          <button
            className="mt-5 mx-auto w-36 px-2 py-2 
            text-white bg-blue-300 rounded focus:outline-none 
"
            type="submit"
            disabled
          >
            User isn't login
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTaskForm;
