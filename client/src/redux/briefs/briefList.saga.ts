import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { BriefAllActionTypes, IBrief } from "./briefList.type";
import {
  BriefAllErrorAction,
  BriefAllSuccessAction,
} from "./briefList.reducer";

const getBriefAll = () => axios.get("http://localhost:3004/briefs");

export function* getBriefAllWorker(): any {
  try {
    const response: AxiosResponse = yield call(getBriefAll);
    yield put(BriefAllSuccessAction({ briefAll: response.data }));
  } catch (e) {
    yield put(BriefAllErrorAction({ error: (e as Error).message }));
  }
}

export function* briefAllWatcher() {
  yield takeEvery(BriefAllActionTypes.BRIEF_ALL_REQUEST, getBriefAllWorker);
}
