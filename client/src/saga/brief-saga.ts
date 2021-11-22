import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { BriefAllActionTypes, IBrief } from "../types/brief-type";
import {
  BriefAllErrorAction,
  BriefAllSuccessAction,
} from "../store/reducers/brief-reducer";

const getBriefAll = () =>
  axios.get("http://localhost:7000/api/brief/all/619174ee82475f0444d964c0");

export function* getBriefAllWorker(): any {
  try {
    const response: AxiosResponse = yield call(getBriefAll);
    yield put(BriefAllSuccessAction({ briefAll: response.data }));
  } catch (e) {
    // @ts-ignore
    yield put(BriefAllErrorAction({ error: e.message }));

}

export function* briefAllWatcher() {
  yield takeEvery(BriefAllActionTypes.BRIEF_ALL_REQUEST, getBriefAllWorker);
}