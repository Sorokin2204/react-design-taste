import { combineReducers } from "redux";
import { briefAllReducer } from "./briefs/briefList.reducer";
import { passedAllReducer } from "./passed/passed.reducer";
import { briefSingleReducer } from "./brief/briefItem.reducer";

export const rootReducer = combineReducers({
  briefAllReducer,
  passedAllReducer,
  briefSingleReducer,
});
