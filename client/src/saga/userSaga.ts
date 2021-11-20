import { put, takeEvery, call, takeLatest, all } from "redux-saga/effects";
import { UserActionTypes } from "../types";
import {
  getUserAction,
  getUserSuccessAction,
} from "../store/reducers/userReducer";

const getUsers = () => fetch("https://jsonplaceholder.typicode.com/users");

function* getUsersWorker() {
  // @ts-ignore
  const userData = yield call(getUsers);
  // @ts-ignore
  const userJson = yield call(() => new Promise((res) => res(userData.json())));
  yield put(getUserSuccessAction(userJson));
}

export function* usersWatcher() {
  yield all([takeLatest(UserActionTypes.FETCH_USERS, getUsersWorker)]);
} // @ts-ignore
