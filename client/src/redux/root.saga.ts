import { all, fork } from "redux-saga/effects";
import { briefAllWatcher } from "./briefs/briefList.saga";
import { passedAllWatcher } from "./passed/passed.saga";
import { briefSingleWatcher } from "./brief/briefItem.saga";

export function* rootSaga() {
  yield all([
    fork(briefAllWatcher),
    fork(passedAllWatcher),
    fork(briefSingleWatcher),
  ]);
}
