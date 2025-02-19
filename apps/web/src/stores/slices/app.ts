import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type Notification = {
  message: string;
  variant: "destructive" | "success";
};

type AppState = {
  notification?: Notification;
};

const initialState: AppState = {};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{ notification: Notification }>,
    ) => {
      state.notification = action.payload.notification;
    },
    clearNotification: (state) => {
      state.notification = undefined;
    },
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;

export const appState = (root: RootState) => root.app;
