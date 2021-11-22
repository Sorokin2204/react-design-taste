import { all, fork } from "redux-saga/effects";
import { briefAllWatcher } from "./brief-saga";

export function* rootSaga() {
  yield all([fork(briefAllWatcher)]);
}
