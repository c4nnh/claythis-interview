import { all } from "redux-saga/effects";
import { menuSaga } from "./menu";

export function* rootSaga() {
  yield all([menuSaga()]);
}
