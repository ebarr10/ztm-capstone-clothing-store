import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";

// Create a slice and then pull user and then a selector for the current user
export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
