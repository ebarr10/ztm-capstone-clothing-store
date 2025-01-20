import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) next(action);
//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);

//   // Once all middleware and reducers run then this part will actually run
//   console.log("nextState: ", store.getState());
// };

const middleWares = [
  // logger,
  // loggerMiddleware,
];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, composedEnhancers);
