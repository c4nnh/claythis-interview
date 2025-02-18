import { combineReducers } from "@reduxjs/toolkit";
import { menuReducer } from "../slices/menu";

export const rootReducer = combineReducers({
  menu: menuReducer,
});
