import axios from "axios";

// /* Get all tasks for all users*/
// export const fetchAllTask = () => {};

/* Get all tasks for a particular user*/
export const fetchTasksForUser = async (userId: string) => {
  const getRequest = await axios.get(`/api/task/${userId}`);
  return getRequest.data;
};
