import { IUserState, UserAction, UserActionTypes } from "../../types";

const initState: IUserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = (
  state = initState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return { loading: true, error: null, users: [] };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return { loading: false, error: null, users: action.payload };
    case UserActionTypes.FETCH_USERS_ERROR:
      return { loading: false, error: action.payload, users: [] };
    default:
      return state;
  }
};

export const getUserAction = (): any => ({
  type: UserActionTypes.FETCH_USERS,
});
export const getUserSuccessAction = (res: any): any => ({
  type: UserActionTypes.FETCH_USERS_SUCCESS,
  payload: res,
});
export const getUserErrorAction = (res: any): any => ({
  type: UserActionTypes.FETCH_USERS_SUCCESS,
  payload: res,
});
