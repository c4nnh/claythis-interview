import { CreateMenuDto, Menu, UpdateMenuDto } from "@/types/menu";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createMenuApi,
  getMenuDetailsApi,
  getRootMenusApi,
  updateMenuApi,
} from "../services/menu";
import { appActions } from "../slices/app";
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
      appActions.setNotification({
        notification: {
          message: "Get root menus failed",
          variant: "destructive",
        },
      }),
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
      appActions.setNotification({
        notification: {
          message: "Get menu details failed",
          variant: "destructive",
        },
      }),
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
    yield put(
      appActions.setNotification({
        notification: {
          message: "Create menu successful",
          variant: "success",
        },
      }),
    );
  } catch (error) {
    yield put(
      appActions.setNotification({
        notification: {
          message: "Create menu failed",
          variant: "destructive",
        },
      }),
    );
  }
}

function* updateMenuSaga(action: {
  type: string;
  payload: {
    id: string;
    dto: UpdateMenuDto;
    onSuccess: (menu: Menu) => void;
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
    yield put(
      appActions.setNotification({
        notification: {
          message: "Update menu successful",
          variant: "success",
        },
      }),
    );
    action.payload.onSuccess(response);
  } catch (error) {
    yield put(
      appActions.setNotification({
        notification: {
          message: "Update menu failed",
          variant: "destructive",
        },
      }),
    );
  }
}
