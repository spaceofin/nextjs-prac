import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  MemoWithUserName,
  fetchAllMemosByUserId,
  fetchPublicMemos as fetchPublicMemosService,
} from "@/app/service/memos-service";

export const fetchUserMemos = createAsyncThunk("memos/fetchAll", async () => {
  const memos = await fetchAllMemosByUserId();
  return memos;
});

export const fetchPublicMemos = createAsyncThunk(
  "memos/fetchPublic",
  async () => {
    const memos = await fetchPublicMemosService();
    return memos;
  }
);

interface MemoState {
  data: MemoWithUserName[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: MemoState = {
  data: [],
  isLoading: false,
  error: null,
};

const memosSlice = createSlice({
  name: "memos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    for (const thunk of [fetchUserMemos, fetchPublicMemos]) {
      builder
        .addCase(thunk.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error;
        });
    }
  },
});

export const selectMemos = (state: RootState) => state.memos;

export const memosReducer = memosSlice.reducer;
