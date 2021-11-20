import { all, fork } from "redux-saga/effects";
import { usersWatcher } from "./userSaga";
export function* rootSaga() {
  yield all([fork(usersWatcher)]);
}
