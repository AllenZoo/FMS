import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LivestockState {
  livestock: LivestockDTO[];
  filteredLivestock: LivestockDTO[];
  displayFiltered: boolean;
}

/**
 * Slice for livestock
 */
const initialState = {
  livestock: [],
  filteredLivestock: [],
  displayFiltered: false,
} as LivestockState;

const livestockSlice = createSlice({
  name: "livestock",
  initialState,
  reducers: {
    setLivestock(state = initialState, action: PayloadAction<LivestockDTO[]>) {
      state.livestock = action.payload;
    },
    addLivestock(state, action: PayloadAction<LivestockDTO>) {
      state.livestock.push(action.payload);
    },
    removeLivestock(state, action: PayloadAction<LivestockDTO>) {
      state.livestock = state.livestock.filter(
        (livestock) => livestock.tag_id !== action.payload.tag_id
      );
    },
    updateLivestock(state, action: PayloadAction<LivestockDTO>) {
      state.livestock = state.livestock.map((livestock) =>
        livestock.tag_id === action.payload.tag_id ? action.payload : livestock
      );
    },
    setFilteredLivestock(
      state = initialState,
      action: PayloadAction<LivestockDTO[]>
    ) {
      state.filteredLivestock = action.payload;
    },
    setDisplayFiltered(state = initialState, action: PayloadAction<boolean>) {
      state.displayFiltered = action.payload;
    },
  },
});

export const {
  setLivestock,
  addLivestock,
  removeLivestock,
  updateLivestock,
  setFilteredLivestock,
  setDisplayFiltered,
} = livestockSlice.actions;
export const selectLivestock = (
  state: unknown & { livestock: LivestockState }
) => state.livestock.livestock;
export default livestockSlice.reducer;
