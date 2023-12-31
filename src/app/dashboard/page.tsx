"use client";

//@ts-ignore
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { RootState } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";

//COMPONENT
import Loader from "@/components/Loader";
import Task from "@/components/Tasks/Task";
import TaskForm from "@/components/Tasks/TaskForm";

//REDUCER ACTIONS
import {
  modifyTasks,
  toResetBulkDeleteTasks,
} from "@/utils/reducers/taskReducer";
import { closeBanner } from "@/utils/reducers/errorReducer";

//ACTIONS
import { fetchTasksForUser } from "@/lib/TaskActions";
import { closedLoader, openLoader } from "@/utils/reducers/loaderReducer";
import { getUserId, getUserName } from "@/lib/auth";

const Dashboard = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    note: "",
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [toBulkDelete, setToBulkDelete] = useState(false);
  const [taskList, setTaskList] = useState<Array<{}>>([]);
  const { data: session }: any = useSession();
  const taskDispatch = useSelector((state: RootState) => state.tasks);
  const { tasks } = taskDispatch;
  const dispatch = useDispatch();
  const userId = session ? session?.user.id : getUserId();
  const userName = session
    ? session?.user?.name?.split(" ")[0]
    : getUserName()?.split(" ")[0];

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await fetchTasksForUser(userId);
      dispatch(modifyTasks(data));
    };

    if (userId) fetchTasks();
  }, [userId]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  useEffect(() => {
    dispatch(closeBanner());
    dispatch(closedLoader());
  }, []);

  const addTaskSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(openLoader());
    const postTask = {
      title: taskData.title,
      note: taskData.note,
      userId: userId,
      isCompleted: false,
    };

    const postRequest = await axios.post("/api/task", postTask, {
      headers: {
        "Content-type": "application/json",
      },
    });

    if (postRequest.status === 200) {
      setTaskData({
        title: "",
        note: "",
      });
      setShowTaskForm(false);

      const fetchData = await fetchTasksForUser(userId);

      dispatch(modifyTasks(fetchData));
    }

    dispatch(closedLoader());
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
      title: "",
      note: "",
    });
    setShowTaskForm(false);
  };

  const handleSignOut = async () => {
    dispatch(openLoader());

    try {
      const logoutRequest = await axios.post("/api/logout/");

      if (logoutRequest.status === 200) {
        localStorage.removeItem("user-id");
        localStorage.removeItem("user-name");
        await signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToBulkDelete = () => {
    setToBulkDelete(!toBulkDelete);
    dispatch(toResetBulkDeleteTasks());
  };

  const handleTasksForDeletion = async () => {
    dispatch(openLoader());

    let isOk: boolean = false;

    const filterTasksForDeletion = tasks.filter(
      (task: any) => task.isForDelete === true
    );

    for (let task of filterTasksForDeletion) {
      const deleteRequest: any = await axios.delete(`/api/task/${task._id}`);

      if (deleteRequest.status === 200) {
        isOk = true;
      } else {
        isOk = false;
      }
    }

    if (isOk) {
      const fetchData = await fetchTasksForUser(userId);
      dispatch(modifyTasks(fetchData));
    }

    dispatch(closedLoader());
  };
  return (
    <>
      <Loader />
      <div className="dasbhboard_header">
        <div className="font-bold text-5xl font-sans text-blueGrey-900 mb-5 flex">
          <p className="flex-grow">Hey, {userName}</p>
          <button
            className="text-sm text-blueGrey-500 font-normal"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        <div className="text-sm mb-5">
          <p>
            You have{" "}
            <span className="text-deepPurple-500">
              {taskList.length} {taskList.length > 1 ? `tasks` : `task`}
            </span>{" "}
            to complete
          </p>
        </div>
        <div className="text-sm flex">
          <div className="flex-grow">
            <button
              className="pt-2 pb-2 pl-4 pr-4 text-white bg-deepPurple-900 rounded-full"
              onClick={() => setShowTaskForm(!showTaskForm)}
            >
              Add a task
            </button>
          </div>
          <div className="self-center flex">
            {toBulkDelete ? (
              <button
                className="pt-2 pb-2 pl-4 pr-4 text-white bg-red-600 rounded-full"
                onClick={handleTasksForDeletion}
              >
                Delete tasks
              </button>
            ) : (
              ""
            )}
            <button className="ml-2" onClick={handleToBulkDelete}>
              <UilTrashAlt className=""/>
            </button>
          </div>
        </div>
        <TaskForm
          data={taskData}
          show={showTaskForm}
          action="Add"
          handleSubmit={addTaskSubmit}
          handleOnChange={handleOnChange}
          handleCancel={handleCancel}
        />
      </div>
      <div className="dashboard_body pb-10 mt-5">
        {taskList.length > 0 ? (
          taskList.map((task: any) => (
            <Task
              data={{
                _id: task._id,
                title: task.title,
                note: task.note,
                isCompleted: task.isCompleted,
                isForDelete: task.isForDelete,
                dateCreated: task.date_created,
              }}
              toBulkDelete={toBulkDelete}
              key={task._id}
            />
          ))
        ) : (
          <p className="text-center text-sm mt-10">You have no tasks left</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
