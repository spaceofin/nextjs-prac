import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Memo } from "@prisma/client";
import {
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
  data: Memo[];
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
    builder
      .addCase(fetchPublicMemos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublicMemos.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload;
      })
      .addCase(fetchPublicMemos.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error;
      });
  },
});

export const selectMemo = (state: RootState) => state.memos;

export const memosReducer = memosSlice.reducer;
