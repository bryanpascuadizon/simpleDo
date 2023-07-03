import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    modifyTasks: (state, action) => {
      const { payload } = action;
      state.tasks = [...payload];
    },
    toSetDeleteTask: (state, action) => {
      const { payload } = action;
      const taskIndex = state.tasks.findIndex(
        (item: any) => item._id === payload
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex].isForDelete =
          !state.tasks[taskIndex].isForDelete;
      }
    },
    toResetBulkDeleteTasks: (state) => {
      state.tasks.map((task: any) => task.isForDelete = false)
    }
  },
});

export const { modifyTasks, toSetDeleteTask, toResetBulkDeleteTasks } = taskSlice.actions;
export default taskSlice.reducer;
