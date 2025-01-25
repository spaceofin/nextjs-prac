import { configureStore } from "@reduxjs/toolkit";
import { memosReducer } from "./features/memos/memosSlice";
import { groupsReducer } from "./features/groups/groupsSlice";

export const store = configureStore({
  reducer: { memos: memosReducer, groups: groupsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
