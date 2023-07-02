"use client";

//@ts-ignore
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { RootState } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//COMPONENT
import Task from "@/components/Tasks/Task";
import TaskForm from "./Tasks/TaskForm";

//ACTIONS
import { fetchTasksForUser } from "@/lib/TaskActions";
import { modifyTasks } from "@/utils/reducers/taskReducer";

const Dashboard = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    note: "",
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskList, setTaskList] = useState<Array<{}>>([]);
  const { data: session }: any = useSession();
  const taskDispatch = useSelector((state: RootState) => state.tasks);
  const { tasks } = taskDispatch;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await fetchTasksForUser(session?.user.id);
      setTaskList(data);
    };

    fetchTasks();
  }, [tasks]);

  const addTaskSubmit = async (e: any) => {
    e.preventDefault();

    const postTask = {
      title: taskData.title,
      note: taskData.note,
      userId: session?.user.id,
      isCompleted: false,
    };

    const postRequest = await axios.post("/api/task", postTask, {
      headers: {
        "Content-type": "application/json",
      },
    });

    if (postRequest.statusText === "OK") {
      setTaskData({
        title: "",
        note: "",
      });
      setShowTaskForm(false);

      const fetchData = await fetchTasksForUser(session?.user.id);
      dispatch(modifyTasks(fetchData));
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
      title: "",
      note: "",
    });
    setShowTaskForm(false)
  }

  return (
    <>
      <div className="dasbhboard_header">
        <div className="font-bold text-5xl font-sans text-blueGrey-900 mb-5 flex">
          <p className="flex-grow">Hey, {session?.user?.name?.split(" ")[0]}</p>
          <button
            className="text-sm text-blueGrey-500 font-normal"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
        <div className="text-sm mb-5">
          <p>
            You have{" "}
            <span className="text-deepPurple-500">{taskList.length} {taskList.length > 1 ? `tasks`: `task`}</span>{" "}
            to complete
          </p>87u9
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
          <div className="self-center">
            <button className="">
              <UilTrashAlt />
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
                dateCreated: task.date_created,
              }}
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
