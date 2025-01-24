export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) next(action);
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  // Once all middleware and reducers run then this part will actually run
  console.log("nextState: ", store.getState());
};
