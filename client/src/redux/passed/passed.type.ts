export enum PassedActionTypes {
  PASSED_ALL_REQUEST = "PASSED_ALL_REQUEST",
  PASSED_ALL_SUCCESS = "PASSED_ALL_SUCCESS",
  PASSED_ALL_ERROR = "PASSED_ALL_ERROR",
  PASSED_ALL_CLOSE = "PASSED_ALL_CLOSE",
}

export interface IPassed {
  id: string;
  fullName: string;
  image: string;
  datePassed: string;
  idBrief: string;
}

export interface IPassedState {
  idActiveBrief: string | null;
  isOpenDrawer: boolean;
  isLoading: boolean;
  passedAll: IPassed[];
  error: string | null;
}

export interface IPassedAllRequestPayload {
  idBrief: string;
}
export interface IPassedAllSuccessPayload {
  passedAll: IPassed[];
}
export interface IPassedAllErrorPayload {
  error: string;
}

export type PassedAllRequest = {
  type: PassedActionTypes.PASSED_ALL_REQUEST;
  payload: IPassedAllRequestPayload;
};

export type PassedAllSuccess = {
  type: PassedActionTypes.PASSED_ALL_SUCCESS;
  payload: IPassedAllSuccessPayload;
};
export type PassedAllClose = {
  type: PassedActionTypes.PASSED_ALL_CLOSE;
};

export type PassedAllError = {
  type: PassedActionTypes.PASSED_ALL_ERROR;
  payload: IPassedAllErrorPayload;
};

export type PassedAction =
  | PassedAllRequest
  | PassedAllSuccess
  | PassedAllError
  | PassedAllClose;
