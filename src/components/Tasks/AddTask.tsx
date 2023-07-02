"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

//REDUCERS
import { modifyTasks } from "@/utils/reducers/taskReducer";

//ACTIONS
import { fetchTasksForUser } from "@/lib/TaskActions";

interface AddTaskProps {
  show: boolean;
  setAddTask: (show: boolean) => void;
}

const AddTask = ({ show, setAddTask }: AddTaskProps) => {
  const [newTask, setNewTask] = useState({
    title: "",
    note: "",
  });
  const { title, note } = newTask;
  const { data: session }: any = useSession();
  const dispatch = useDispatch();

  const handleOnChange = (e: any) => {
    const { name, value }: { name: string; value: string } = e.target;

    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const postTask = {
      title,
      note,
      userId: session?.user.id,
      isCompleted: false,
    };

    const postRequest = await axios.post("/api/task", postTask, {
      headers: {
        "Content-type": "application/json",
      },
    });

    if (postRequest.statusText === "OK") {
      setNewTask({
        title: "",
        note: "",
      });
      setAddTask(false);

      const fetchData = await fetchTasksForUser(session?.user.id);
      dispatch(modifyTasks(fetchData));
    }
  };

  return (
    <>
      {show ? (
        <div className="mb-5 shadow p-5 transition ease-in-out duration-300 rounded-lg">
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <label className="text-sm font-semibold w-full">Title</label>
              <br />
              <input
                className="border border-blueGrey-100 rounded-md w-full mt-2 text-xs p-3"
                type="text"
                name="title"
                value={title}
                onChange={handleOnChange}
                placeholder="type here..."
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold w-full">Note</label>
              <br />
              <textarea
                className="border border-blueGrey-100 rounded-md w-full mt-2 text-xs p-3"
                name="note"
                value={note}
                onChange={handleOnChange}
                placeholder="type here..."
                required
              />
            </div>
            <div className="flex flex-row-reverse text-xs">
              <button className="m-1 pt-2 pb-2 pl-4 pr-4 bg-slate-200 rounded-full">
                Cancel
              </button>
              <button
                type="submit"
                className="m-1 pt-2 pb-2 pl-4 pr-4 text-white bg-deepPurple-900 rounded-full"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddTask;
