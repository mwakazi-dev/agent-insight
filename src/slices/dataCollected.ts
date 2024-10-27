"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataCollectedState {
  dataCollected: any;
}

const initialState: DataCollectedState = {
  dataCollected: null,
};

export const dataCollectedSlice = createSlice({
  name: "dataCollected",
  initialState,
  reducers: {
    setDataCollected: (state: any, action: PayloadAction<any>) => {
      state.dataCollected = action.payload;
    },

    clearDataCollected: (state: any) => {
      state.dataCollected = null;
    },
  },
});

export const { setDataCollected, clearDataCollected } =
  dataCollectedSlice.actions;
export default dataCollectedSlice.reducer;
