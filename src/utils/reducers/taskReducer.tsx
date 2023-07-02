import { createSlice, current } from "@reduxjs/toolkit";

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
  },
});

export const {
  modifyTasks
} = taskSlice.actions;
export default taskSlice.reducer;
