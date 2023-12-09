"use client";
import React, { useEffect, useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { database } from "./firebase";
import { UserAuth } from "./context/AuthContext";
import { FaTrashCan } from "react-icons/fa6";
import Spinner from "./components/Spinner"

export default function Home() {
  const { user } = UserAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = UserAuth();

  useEffect(() => {
    if (user) {
      const userId = user.uid;

      const tasksRef = ref(database, `tasks/${userId}`);

      const unsubscribe = onValue(tasksRef, (snapshot) => {
        try {
          const tasksData = snapshot.val();
          const tasksArray = tasksData ? Object.values(tasksData) : [];
          setTasks(tasksArray);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleCheck = (taskId, completed) => {
    if (user) {
      const userId = user.uid;
      const taskRef = ref(database, `tasks/${userId}/${taskId}`);

      update(taskRef, {
        completed: !completed,
      });
    }
  };

  const deletePost = async (id) => {
    if (user) {
      const userId = user.uid;
      const taskRef = ref(database, `tasks/${userId}/${id}`);

      try {
       
        await remove(taskRef);

        
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== id)
        );
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  console.log(tasks);
  return (
    <main className="p-4">
      {user ? (
        <div>
          <h2>Task List</h2>
          {loading ? (
            <Spinner />
          ) : (
            <ul>
              {tasks.map((task) => (
                <div
                  className="border-b border-slate-600 px-5 py-5"
                  key={task.id}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        checked={task.completed}
                        onChange={() => handleCheck(task.id, task.completed)}
                        className="mt-3 w-5 self-start md:self-auto md:mt-0 md:w-5 cursor-pointer text-green-500 bg-red-500"
                      />
                      <h1
                        className={`font-semibold text-lg ${
                          task.completed && " line-through text-slate-500"
                        }`}
                      >
                        {task.title}
                      </h1>
                    </div>
                    <div>
                      <button
                        className="mt-1 px-2 py-1 font-semibold border border-zinc-500 rounded hover:bg-red-500"
                        onClick={() => deletePost(task.id)}
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>user is not signed in</div>
      )}
    </main>
  );
}
