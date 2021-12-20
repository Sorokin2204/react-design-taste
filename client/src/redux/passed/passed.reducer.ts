import {
  IPassedAllErrorPayload,
  IPassedAllRequestPayload,
  IPassedAllSuccessPayload,
  IPassedState,
  PassedAction,
  PassedActionTypes,
  PassedAllClose,
  PassedAllError,
  PassedAllRequest,
  PassedAllSuccess,
} from "./passed.type";

export const initialPassedState: IPassedState = {
  idActiveBrief: null,
  isOpenDrawer: false,
  isLoading: true,
  passedAll: [],
  error: null,
};

export const passedAllReducer = (
  state = initialPassedState,
  action: PassedAction
): IPassedState => {
  switch (action.type) {
    case PassedActionTypes.PASSED_ALL_REQUEST:
      return {
        ...state,
        idActiveBrief: action.payload.idBrief,
        isOpenDrawer: true,
      };
    case PassedActionTypes.PASSED_ALL_SUCCESS:
      return {
        ...state,
        isOpenDrawer: true,
        isLoading: false,
        passedAll: action.payload.passedAll,
      };
    case PassedActionTypes.PASSED_ALL_CLOSE:
      return {
        ...state,
        idActiveBrief: null,
        isOpenDrawer: false,
      };
    case PassedActionTypes.PASSED_ALL_ERROR:
      return {
        ...state,
        idActiveBrief: null,
        isOpenDrawer: false,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};

export const PassedRequestAction = (
  payload: IPassedAllRequestPayload
): PassedAllRequest => ({
  type: PassedActionTypes.PASSED_ALL_REQUEST,
  payload,
});
export const PassedSuccessAction = (
  payload: IPassedAllSuccessPayload
): PassedAllSuccess => ({
  type: PassedActionTypes.PASSED_ALL_SUCCESS,
  payload,
});
export const PassedCloseAction = (): PassedAllClose => ({
  type: PassedActionTypes.PASSED_ALL_CLOSE,
});
export const PassedErrorAction = (
  payload: IPassedAllErrorPayload
): PassedAllError => ({
  type: PassedActionTypes.PASSED_ALL_ERROR,
  payload,
});
