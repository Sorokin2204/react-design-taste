import {
  BriefActins,
  BriefAllActionTypes,
  IBriefAllError,
  IBriefAllErrorPayload,
  IBriefAllRequest,
  IBriefAllSuccess,
  IBriefAllSuccessPayload,
  IBriefState,
} from "./briefList.type";

const initialBriefState: IBriefState = {
  briefAll: [],
  isLoading: true,
  error: null,
};

export const briefAllReducer = (
  state = initialBriefState,
  action: BriefActins
): IBriefState => {
  switch (action.type) {
    case BriefAllActionTypes.BRIEF_ALL_REQUEST: {
      return {
        ...state,
        ...initialBriefState,
      };
    }
    case BriefAllActionTypes.BRIEF_ALL_SUCCESS: {
      return {
        ...state,
        briefAll: action.payload.briefAll,
        isLoading: false,
        error: null,
      };
    }
    case BriefAllActionTypes.BRIEF_ALL_ERROR: {
      return {
        ...state,
        briefAll: [],
        isLoading: false,
        error: action.payload.error,
      };
    }
    default:
      return { ...state };
  }
};

export const BriefAllRequestAction = (): IBriefAllRequest => ({
  type: BriefAllActionTypes.BRIEF_ALL_REQUEST,
});
export const BriefAllSuccessAction = (
  payload: IBriefAllSuccessPayload
): IBriefAllSuccess => ({
  type: BriefAllActionTypes.BRIEF_ALL_SUCCESS,
  payload,
});
export const BriefAllErrorAction = (
  payload: IBriefAllErrorPayload
): IBriefAllError => ({ type: BriefAllActionTypes.BRIEF_ALL_ERROR, payload });
