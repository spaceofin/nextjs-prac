import { configureStore } from "@reduxjs/toolkit";
import { memosReducer } from "./features/memos/memosSlice";
import { groupsReducer } from "./features/groups/groupsSlice";
import { pinnedGroupsReducer } from "./features/groups/pinnedGroupsSlice";

export const store = configureStore({
  reducer: {
    memos: memosReducer,
    groups: groupsReducer,
    pinnedGroups: pinnedGroupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
