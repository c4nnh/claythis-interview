import { CreateMenuDto, Menu, UpdateMenuDto } from "@/types/menu";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createMenuApi,
  getMenuDetailsApi,
  getRootMenusApi,
  updateMenuApi,
} from "../services/menu";
import { menuActions } from "../slices/menu";

export type RawMenu = Omit<Menu, "parent" | "root"> & {
  relatedMenus: RawMenu[];
  parentId: string;
};

export function* menuSaga() {
  yield all([takeLatest(menuActions.getRootMenus.type, getRootMenusSaga)]);
  yield all([takeLatest(menuActions.createMenu.type, createMenuSaga)]);
  yield all([takeLatest(menuActions.updateMenu.type, updateMenuSaga)]);
  yield all([takeLatest(menuActions.getMenuDetails.type, getMenuDetailsSaga)]);
}

function* getRootMenusSaga() {
  try {
    const response: { menus: Menu[] } = yield call(getRootMenusApi);

    yield put(
      menuActions.getRootMenusSuccess({
        menus: response.menus,
      }),
    );
  } catch (error) {
    yield put(
      menuActions.getRootMenusFailure({ message: "Get root menus failed" }),
    );
  }
}

function* getMenuDetailsSaga(action: {
  type: string;
  payload: { id: string };
}) {
  try {
    const response: RawMenu = yield call(getMenuDetailsApi, action.payload.id);

    yield put(
      menuActions.getMenuDetailsSuccess({
        menu: response,
      }),
    );
  } catch (error) {
    yield put(
      menuActions.getMenuDetailsFailure({ message: "Get menu details failed" }),
    );
  }
}

function* createMenuSaga(action: {
  type: string;
  payload: { dto: CreateMenuDto; onSuccess: (id: string) => void };
}) {
  try {
    const response: Menu = yield call(createMenuApi, action.payload.dto);
    yield put(
      menuActions.createMenuSuccess({
        menu: response,
      }),
    );
    action.payload.onSuccess(response.id);
  } catch (error) {
    yield put(menuActions.createMenuFailure({ message: "Create menu failed" }));
  }
}

function* updateMenuSaga(action: {
  type: string;
  payload: {
    id: string;
    dto: UpdateMenuDto;
  };
}) {
  try {
    const response: Menu = yield call(
      updateMenuApi,
      action.payload.id,
      action.payload.dto,
    );
    yield put(
      menuActions.updateMenuSuccess({
        menu: response,
      }),
    );
  } catch (error) {
    yield put(menuActions.createMenuFailure({ message: "Update menu failed" }));
  }
}
