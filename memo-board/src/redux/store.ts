import { configureStore } from "@reduxjs/toolkit";
import { memosReducer } from "./features/memos/memosSlice";

export const store = configureStore({
  reducer: { memos: memosReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
