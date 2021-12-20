export enum BriefSingleActionTypes {
  BRIEF_SINGLE_REQUEST = "BRIEF_SINGLE_REQUEST",
  BRIEF_SINGLE_SUCCESS = "BRIEF_SINGLE_SUCCESS",
  BRIEF_SINGLE_ERROR = "BRIEF_SINGLE_ERROR",
  BRIEF_SINGLE_TASK_SELECT = "BRIEF_SINGLE_TASK_SELECT",
  BRIEF_SINGLE_TASK_UPDATE_LOCAL = "BRIEF_SINGLE_TASK_UPDATE_LOCAL",
}

export interface ISlide {
  id: string;
  thumbnailImage: string;
  fullImage: string;
}

export interface ITask {
  id: string;
  type: string;
  question: string;
  slides: ISlide[];
}

export type IBrief = {
  id: string;
  title: string;
  slug: string;
  tasks: ITask[];
};

export interface IBriefSingleSuccessPayload {
  BriefSingle: IBrief;
}
export interface IBriefSingleTaskUpdateLocalPayload {
  updatedTask: ITask;
}
export interface IBriefSingleErrorPayload {
  error: string;
}
export interface IBriefSingleTaskSelectPayload {
  selectedTaskId: string;
  selectedSlideId: string;
}

export type IBriefSingleRequest = {
  type: typeof BriefSingleActionTypes.BRIEF_SINGLE_REQUEST;
};
export type IBriefSingleSuccess = {
  type: typeof BriefSingleActionTypes.BRIEF_SINGLE_SUCCESS;
  payload: IBriefSingleSuccessPayload;
};
export type IBriefSingleError = {
  type: typeof BriefSingleActionTypes.BRIEF_SINGLE_ERROR;
  payload: IBriefSingleErrorPayload;
};
export type IBriefSingleTaskSelect = {
  type: typeof BriefSingleActionTypes.BRIEF_SINGLE_TASK_SELECT;
  payload: IBriefSingleTaskSelectPayload;
};
export type IBriefSingleTaskUpdateLocal = {
  type: typeof BriefSingleActionTypes.BRIEF_SINGLE_TASK_UPDATE_LOCAL;
  payload: IBriefSingleTaskUpdateLocalPayload;
};
export interface IBriefState {
  BriefSingle: IBrief | undefined;
  isLoading: boolean;
  error: null | string;
  selectedTaskId: null | string;
  selectedSlideId: null | string;
}

export type BriefSingleActins =
  | IBriefSingleRequest
  | IBriefSingleSuccess
  | IBriefSingleError
  | IBriefSingleTaskSelect
  | IBriefSingleTaskUpdateLocal;
