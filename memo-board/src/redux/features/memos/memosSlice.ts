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
  createMemo as createMemoService,
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

export const createMemo = createAsyncThunk(
  "memos/createMemo",
  async (formData: FormData, { rejectWithValue }) => {
    const { memo, errors } = await createMemoService(formData);
    if (errors) {
      const errorMessages = Object.keys(errors)
        .map((key) => {
          const messages = errors[key as keyof typeof errors];
          return messages ? messages.join("\n") : "";
        })
        .join("\n");

      return rejectWithValue(errorMessages);
    }
    return memo;
  }
);

interface MemoState {
  data: MemoWithUserName[];
  isLoading: boolean;
  error: SerializedError | null | string;
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

    builder
      .addCase(createMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload as MemoWithUserName);
      })
      .addCase(createMemo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectMemos = (state: RootState) => state.memos;

export const memosReducer = memosSlice.reducer;
