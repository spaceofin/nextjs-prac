import { RootState } from "@/redux/store";
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  fetchNewPinnedGroupMemos as fetchNewPinnedGroupMemosService,
  fetchPinnedGroupsMemos as fetchPinnedGroupsMemosService,
} from "@/app/service/groups-service";
import { Memo } from "@prisma/client";

export type PinnedGroupWithMemos = {
  id: number;
  name: string;
  memos: Memo[];
};

export const fetchPinnedGroupsMemos = createAsyncThunk(
  "pinnedGroups/fetchAll",
  async () => {
    const groupsMemos = await fetchPinnedGroupsMemosService();
    return groupsMemos;
  }
);

export const fetchNewPinnedGroupMemos = createAsyncThunk(
  "pinnedGroups/fetchNew",
  async (groupId: number) => {
    const groupMemos = await fetchNewPinnedGroupMemosService(groupId);
    return groupMemos;
  }
);

interface PinnedGroupsState {
  data: PinnedGroupWithMemos[];
  isLoading: boolean;
  error: SerializedError | null | string;
}

const initialState: PinnedGroupsState = {
  data: [],
  isLoading: false,
  error: null,
};

const pinnedGroupsSlice = createSlice({
  name: "pinnedGroups",
  initialState,
  reducers: {
    removePinnedGroupMemo: (state, action) => {
      state.data = state.data.filter((group) => group.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPinnedGroupsMemos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPinnedGroupsMemos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPinnedGroupsMemos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchNewPinnedGroupMemos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewPinnedGroupMemos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(fetchNewPinnedGroupMemos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const selectPinnedGroups = (state: RootState) => state.pinnedGroups;
export const { removePinnedGroupMemo } = pinnedGroupsSlice.actions;

export const pinnedGroupsReducer = pinnedGroupsSlice.reducer;
