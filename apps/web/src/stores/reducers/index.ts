import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "../slices/app";
import { menuReducer } from "../slices/menu";

export const rootReducer = combineReducers({
  app: appReducer,
  menu: menuReducer,
});
