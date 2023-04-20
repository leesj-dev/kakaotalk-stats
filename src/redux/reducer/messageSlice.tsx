import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AnalyzedMessages } from "../../components/main/Main";

const initialState: AnalyzedMessages[] = [];

export const analyzedMessageSlice = createSlice({
  name: "analyzedMessage",
  initialState,
  reducers: {
    setAnalyzedMessage: (state, action: PayloadAction<AnalyzedMessages[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export let { setAnalyzedMessage } = analyzedMessageSlice.actions;
