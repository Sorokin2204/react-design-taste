import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "./root.saga";
import { briefAllReducer } from "./briefs/briefList.reducer";
import { briefAllWatcher } from "./briefs/briefList.saga";
import { passedAllReducer } from "./passed/passed.reducer";
import { rootReducer } from "./root.reducer";

const saga = createSagaMiddleware();

export const rootStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(saga))
);

export type RootState = ReturnType<typeof rootReducer>;

saga.run(rootSaga);
