"use client";

//@ts-ignore
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { RootState } from "@/utils/store";
import { useSelector } from "react-redux";

//COMPONENT
import Task from "@/components/Tasks/Task";
import AddTask from "./Tasks/AddTask";

//ACTIONS
import { fetchTasksForUser } from "@/lib/TaskActions";

const Dashboard = () => {
  const [addTask, setAddTask] = useState(false);
  const [taskList, setTaskList] = useState<Array<{}>>([]);
  const { data: session }: any = useSession();
  const taskDispatch = useSelector((state: RootState) => state.tasks);
  const { tasks } = taskDispatch;

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await fetchTasksForUser(session?.user.id);
      setTaskList(data);
    };

    fetchTasks();
  }, [tasks]);

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
            <span className="text-deepPurple-500">{taskList.length} tasks</span>{" "}
            to complete
          </p>
        </div>
        <div className="text-sm flex">
          <div className="flex-grow">
            <button
              className="pt-2 pb-2 pl-4 pr-4 text-white bg-deepPurple-900 rounded-full"
              onClick={() => setAddTask(!addTask)}
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
        <AddTask show={addTask} setAddTask={setAddTask} />
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
          <p className="text-center text-sm mt-10">You have no task left</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
