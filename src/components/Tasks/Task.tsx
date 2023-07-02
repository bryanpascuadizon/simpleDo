"use client";

import { fetchTasksForUser } from "@/lib/TaskActions";
import { modifyTasks } from "@/utils/reducers/taskReducer";
import {
  UilCheckCircle,
  UilCircle,
  UilEdit,
  UilTrashAlt,
  //@ts-ignore
} from "@iconscout/react-unicons";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface TaskProps {
  data: {
    _id: string;
    title: string;
    note: string;
    isCompleted: boolean;
    dateCreated: Date;
  };
}

const Task = ({ data }: TaskProps) => {
  const { _id, title, note, isCompleted, dateCreated } = data;
  const taskDate = moment(dateCreated).format("MMM-DD-YYYY");
  const { data: session }: any = useSession();
  const dispatch = useDispatch();

  const handleChecker = async () => {
    const patchRequest = await axios.patch(
      `/api/task/${_id}`,
      { isCompleted: !isCompleted },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (patchRequest.statusText === "OK") {
      const fetchData = await fetchTasksForUser(session?.user.id);
      dispatch(modifyTasks(fetchData));
    }
  };

  const handleDelete = async () => {
    const deleteRequest = await axios.delete(`/api/task/${_id}`);
    
    if (deleteRequest.statusText === "OK") {
      const fetchData = await fetchTasksForUser(session?.user.id);
      dispatch(modifyTasks([]));
    }
  };

  return (
    <div className="task shadow p-5 rounded-lg mb-5 flex">
      <div className="flex-grow">
        <p className="title text-sm font-semibold mb-2">{title}</p>
        <p className="note text-xs whitespace-pre-line">{note}</p>
        <p className="mt-5 text-[10px] text-blueGrey-500">{taskDate}</p>
      </div>
      <div className="checker relative">
        {isCompleted ? (
          <button
            className="text-green-600 text-xs absolute top-0 right-0 mb-2"
            onClick={handleChecker}
          >
            <UilCheckCircle className="h-5 w-5" />
          </button>
        ) : (
          <button
            className="text-blueGrey-600 text-xs absolute top-0 right-0 mb-2"
            onClick={handleChecker}
          >
            <UilCircle className="h-5 w-5" />
          </button>
        )}
        <br />
        <div className="mt-2 text-xs flex">
          <button className="text-deepPurple-800">
            <UilEdit className="h-5 w-5" />
          </button>
          <button className="" onClick={handleDelete}>
            <UilTrashAlt className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
