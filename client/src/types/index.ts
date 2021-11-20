export enum UserActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}

export interface IUserState {
  users: [];
  loading: boolean;
  error: null | string;
}

interface IFetchUsers {
  type: UserActionTypes.FETCH_USERS;
}
interface IFetchUserSuccess {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: [];
}
interface IFetchUserError {
  type: UserActionTypes.FETCH_USERS_ERROR;
  payload: string;
}
export type UserAction = IFetchUsers | IFetchUserSuccess | IFetchUserError;
