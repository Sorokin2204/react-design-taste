export enum BriefAllActionTypes {
  BRIEF_ALL_REQUEST = "BRIEF_ALL_REQUEST",
  BRIEF_ALL_SUCCESS = "BRIEF_ALL_SUCCESS",
  BRIEF_ALL_ERROR = "BRIEF_ALL_ERROR",
}

export interface IBrief {
  id: string;
  title: string;
  countSteps: number;
  countPassed: number;
  slug: string;
}

export interface IBriefAllSuccessPayload {
  briefAll: IBrief[];
}
export interface IBriefAllErrorPayload {
  error: string;
}

export type IBriefAllRequest = {
  type: typeof BriefAllActionTypes.BRIEF_ALL_REQUEST;
};
export type IBriefAllSuccess = {
  type: typeof BriefAllActionTypes.BRIEF_ALL_SUCCESS;
  payload: IBriefAllSuccessPayload;
};
export type IBriefAllError = {
  type: typeof BriefAllActionTypes.BRIEF_ALL_ERROR;
  payload: IBriefAllErrorPayload;
};
export interface IBriefState {
  briefAll: Array<IBrief>;
  isLoading: boolean;
  error: null | string;
}

export type BriefActins = IBriefAllRequest | IBriefAllSuccess | IBriefAllError;
