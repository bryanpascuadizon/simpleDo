import { createSlice } from "@reduxjs/toolkit";

interface ErrorProps {
  bannerType: string;
  message: string;
  show: boolean;
}

const initialState: ErrorProps = {
  bannerType: "Success" || "Error" || "Info" || "Warning",
  message: "",
  show: false,
};

export const errorSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    openBanner: (state, action) => {
      const { payload } = action;

      const { bannerType, message } = payload;

      state.bannerType = bannerType;
      state.message = message;
      state.show = true;
    },
    closeBanner: (state) => {
      state.message = "";
      state.show = false;
    },
  },
});

export const { openBanner, closeBanner } = errorSlice.actions;
export default errorSlice.reducer;
