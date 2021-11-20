import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { usersWatcher } from "../saga/userSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "../saga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
