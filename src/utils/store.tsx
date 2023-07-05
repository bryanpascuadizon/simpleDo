import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskReducer";
import loaderReducer from "./reducers/loaderReducer";
import errorReducer from "./reducers/errorReducer";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    loader: loaderReducer,
    alerts: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
