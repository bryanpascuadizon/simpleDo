"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

//REDUCERS
import { modifyTasks } from "@/utils/reducers/taskReducer";

//ACTIONS
import { fetchTasksForUser } from "@/lib/TaskActions";
import { useDispatch } from "react-redux";

interface TaskFormProps {
  data: {
    title: string;
    note: string;
  };
  show: boolean;
  action: string;
  handleSubmit: (e: any) => void;
  handleOnChange: (e: any) => void;
  handleCancel: () => void;
}

const TaskForm = ({
  data,
  show,
  action,
  handleSubmit,
  handleOnChange,
  handleCancel,
}: TaskFormProps) => {
  const { title, note } = data;

  return (
    <>
      {show ? (
        <div className="mb-5 shadow p-5 transition ease-in-out duration-300 rounded-lg">
          <form onSubmit={handleSubmit}>
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
              <button
                className="m-1 pt-2 pb-2 pl-4 pr-4 bg-slate-200 rounded-full"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="m-1 pt-2 pb-2 pl-4 pr-4 text-white bg-deepPurple-900 rounded-full"
              >
                {action}
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

export default TaskForm;
