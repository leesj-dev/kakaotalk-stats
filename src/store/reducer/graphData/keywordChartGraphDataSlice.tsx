import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: any[] = [];

export const keywordChartGraphDataSlice = createSlice({
  name: "keywordChartGraphData",
  initialState,
  reducers: {
    setKeywordChartGraphDataSlice: (state, action: PayloadAction<any[]>) => {
      return action.payload;
    },
  },
});

export let { setKeywordChartGraphDataSlice } = keywordChartGraphDataSlice.actions;
