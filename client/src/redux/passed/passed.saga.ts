import axios, { AxiosResponse } from "axios";

import { call, takeEvery, put } from "redux-saga/effects";
import { PassedErrorAction, PassedSuccessAction } from "./passed.reducer";
import {
  IPassed,
  IPassedAllRequestPayload,
  IPassedAllSuccessPayload,
  PassedActionTypes,
  PassedAllRequest,
} from "./passed.type";

export const getPassed = (args: PassedAllRequest) =>
  axios.get(`http://localhost:3004/passed?idBrief=${args.payload.idBrief}`);

export function* passedAllWalker(action: PassedAllRequest) {
  try {
    const passedData: AxiosResponse = yield call(getPassed, action);
    yield put(PassedSuccessAction({ passedAll: passedData.data }));
  } catch (e: any) {
    yield put(PassedErrorAction(e.message));
  }
}

export function* passedAllWatcher() {
  yield takeEvery(PassedActionTypes.PASSED_ALL_REQUEST, passedAllWalker);
}
