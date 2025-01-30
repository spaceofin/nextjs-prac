import { RootState } from "@/redux/store";
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createGroup as createGroupService,
  fetchAllGroups as fetchAllGroupsService,
} from "@/app/service/groups-service";
import { Group } from "@prisma/client";

export type GroupWithStringDate = Omit<Group, "createdAt"> & {
  createdAt: Date | string;
};

export const fetchAllGroups = createAsyncThunk("groups/fetchAll", async () => {
  const groups = await fetchAllGroupsService();
  const groupsWithStringDate = groups.map(
    (group) =>
      ({
        ...group,
        createdAt: group.createdAt.toISOString(),
      } as GroupWithStringDate)
  );
  return groupsWithStringDate;
});

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (formData: FormData, { rejectWithValue }) => {
    const { group, errors } = await createGroupService(formData);
    if (errors) {
      const errorMessages = Object.keys(errors)
        .map((key) => {
          const messages = errors[key as keyof typeof errors];
          return messages ? messages.join("\n") : "";
        })
        .join("\n");

      return rejectWithValue(errorMessages);
    }
    return { ...group, createdAt: group?.createdAt.toISOString() };
  }
);

interface GroupsState {
  data: GroupWithStringDate[];
  isLoading: boolean;
  error: SerializedError | null | string;
}

const initialState: GroupsState = {
  data: [],
  isLoading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload as GroupWithStringDate);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectGroups = (state: RootState) => state.groups;

export const groupsReducer = groupsSlice.reducer;
