import { Middleware } from "redux";
import { RootState } from "../store";
import { AnyAction } from "redux-saga";

function isAction(action: unknown): action is AnyAction {
  return (action as AnyAction).type !== undefined;
}

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!isAction(action)) return next(action);

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    next(action);

    // Once all middleware and reducers run then this part will actually run
    console.log("nextState: ", store.getState());
  };
