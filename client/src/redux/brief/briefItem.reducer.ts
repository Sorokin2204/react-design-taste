import {
  BriefSingleActins,
  BriefSingleActionTypes,
  IBriefSingleError,
  IBriefSingleErrorPayload,
  IBriefSingleRequest,
  IBriefSingleSuccess,
  IBriefSingleSuccessPayload,
  IBriefSingleTaskSelect,
  IBriefSingleTaskSelectPayload,
  IBriefSingleTaskUpdateLocal,
  IBriefSingleTaskUpdateLocalPayload,
  IBriefState,
} from "./briefItem.type";
import produce from "immer";

const initialBriefState: IBriefState = {
  BriefSingle: undefined,
  isLoading: true,
  error: null,
  selectedTaskId: null,
  selectedSlideId: null,
};

export const briefSingleReducer = (
  state = initialBriefState,
  action: BriefSingleActins
): IBriefState => {
  switch (action.type) {
    case BriefSingleActionTypes.BRIEF_SINGLE_REQUEST: {
      return {
        ...state,
        ...initialBriefState,
      };
    }
    case BriefSingleActionTypes.BRIEF_SINGLE_TASK_SELECT: {
      return {
        ...state,
        selectedTaskId: action.payload.selectedTaskId,
        selectedSlideId: action.payload.selectedSlideId,
      };
    }

    case BriefSingleActionTypes.BRIEF_SINGLE_TASK_UPDATE_LOCAL: {
      return produce(state, (draft) => {
        const index = draft!.BriefSingle!.tasks.findIndex(
          (task) => task.id === action.payload.updatedTask.id
        );
        if (typeof index === "number" && index !== -1)
          draft!.BriefSingle!.tasks[index] = action.payload.updatedTask;
      });
    }

    case BriefSingleActionTypes.BRIEF_SINGLE_SUCCESS: {
      return {
        ...state,

        BriefSingle: action.payload.BriefSingle,
        isLoading: false,
        error: null,
      };
    }
    case BriefSingleActionTypes.BRIEF_SINGLE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    default:
      return { ...state };
  }
};

export const BriefSingleRequestAction = (): IBriefSingleRequest => ({
  type: BriefSingleActionTypes.BRIEF_SINGLE_REQUEST,
});
export const BriefSingleSuccessAction = (
  payload: IBriefSingleSuccessPayload
): IBriefSingleSuccess => ({
  type: BriefSingleActionTypes.BRIEF_SINGLE_SUCCESS,
  payload,
});
export const BriefSingleErrorAction = (
  payload: IBriefSingleErrorPayload
): IBriefSingleError => ({
  type: BriefSingleActionTypes.BRIEF_SINGLE_ERROR,
  payload,
});
export const BriefSingleTaskSelect = (
  payload: IBriefSingleTaskSelectPayload
): IBriefSingleTaskSelect => ({
  type: BriefSingleActionTypes.BRIEF_SINGLE_TASK_SELECT,
  payload,
});
export const BriefSingleTaskUpdateLocalAction = (
  payload: IBriefSingleTaskUpdateLocalPayload
): IBriefSingleTaskUpdateLocal => ({
  type: BriefSingleActionTypes.BRIEF_SINGLE_TASK_UPDATE_LOCAL,
  payload,
});
