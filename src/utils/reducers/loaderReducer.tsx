import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.isLoading = true;
    },
    closedLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { openLoader, closedLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
