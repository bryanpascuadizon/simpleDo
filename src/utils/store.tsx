import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskReducer";
import loaderReducer from "./reducers/loaderReducer";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
