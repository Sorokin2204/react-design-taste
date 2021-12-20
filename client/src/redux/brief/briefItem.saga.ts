import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { BriefSingleActionTypes, IBrief } from "./briefItem.type";
import {
  BriefSingleErrorAction,
  BriefSingleSuccessAction,
} from "./briefItem.reducer";

const getBriefSingle = () => axios.get("http://localhost:3004/brief");

export function* getBriefSingleWorker(): any {
  try {
    const response: AxiosResponse = yield call(getBriefSingle);

    yield put(BriefSingleSuccessAction({ BriefSingle: response.data[0] }));
  } catch (e) {
    yield put(BriefSingleErrorAction({ error: (e as Error).message }));
  }
}

export function* getTaskSingleWorker(args: any): any {
  try {
    const response: AxiosResponse = yield call(getBriefSingle);
    // yield put();
  } catch (e) {}
}

export function* briefSingleWatcher() {
  yield takeEvery(
    BriefSingleActionTypes.BRIEF_SINGLE_REQUEST,
    getBriefSingleWorker
  );
}
export function* taskSingleWatcher() {
  yield takeEvery(
    BriefSingleActionTypes.BRIEF_SINGLE_REQUEST,
    getBriefSingleWorker
  );
}
