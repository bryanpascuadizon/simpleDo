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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TaskForm from "./TaskForm";

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
  const [taskData, setTaskData] = useState({
    title: "",
    note: "",
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { _id, title, note, isCompleted, dateCreated } = data;
  const taskDate = moment(dateCreated).format("MMM-DD-YYYY");
  const { data: session }: any = useSession();
  const dispatch = useDispatch();

  const handleChecker = async () => {
    const updateRequest = await axios.patch(
      `/api/task/${_id}`,
      {
        title,
        note,
        isCompleted: !isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (updateRequest.statusText === "OK") {
      const fetchData = await fetchTasksForUser(session?.user.id);
      dispatch(modifyTasks(fetchData));
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const updateRequest = await axios.patch(
      `/api/task/${_id}`,
      {
        title: taskData.title,
        note: taskData.note,
        isCompleted: isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      console.log(updateRequest)
    if (updateRequest.statusText === "OK") {
      const fetchData = await fetchTasksForUser(session?.user.id);
      dispatch(modifyTasks(fetchData));
      setShowTaskForm(false);
    }
  };

  const handleDelete = async () => {
    const deleteRequest = await axios.delete(`/api/task/${_id}`);

    if (deleteRequest.statusText === "OK") {
      const fetchData = await fetchTasksForUser(session?.user.id);
      dispatch(modifyTasks([]));
    }
  };

  const handleOnChange = (e: any) => {
    const { name, value }: { name: string; value: string } = e.target;

    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setTaskData({
      title,
      note,
    });
    setShowTaskForm(false);
  };

  useEffect(() => {
    setTaskData({
      title,
      note,
    });
  }, []);

  return (
    <>
      {showTaskForm === false ? (
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
              <button
                className="text-deepPurple-800"
                onClick={() => setShowTaskForm(!showTaskForm)}
              >
                <UilEdit className="h-5 w-5" />
              </button>
              <button className="" onClick={handleDelete}>
                <UilTrashAlt className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TaskForm
          data={taskData}
          show={showTaskForm}
          action="Update"
          handleSubmit={handleUpdate}
          handleOnChange={handleOnChange}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Task;
