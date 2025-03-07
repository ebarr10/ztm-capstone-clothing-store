import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

// Create a slice and then pull user and then a selector for the current user
export const selectUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
