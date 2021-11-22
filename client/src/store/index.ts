import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "../saga/root-saga";
import { briefAllReducer } from "./reducers/brief-reducer";
import { briefAllWatcher } from "../saga/brief-saga";

const saga = createSagaMiddleware();

export const rootReducer = combineReducers({ briefAllReducer });

export const rootStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(saga))
);

export type RootState = ReturnType<typeof rootReducer>;

saga.run(briefAllWatcher);
