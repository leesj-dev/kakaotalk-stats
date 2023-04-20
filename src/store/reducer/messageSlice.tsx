import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AnalyzedMessages } from "../../components/main/Main";

const initialState: AnalyzedMessages[] = [];

export const analyzedMessagesSlice = createSlice({
  name: "analyzedMessage",
  initialState,
  reducers: {
    setAnalyzedMessages: (state, action: PayloadAction<AnalyzedMessages[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export let { setAnalyzedMessages } = analyzedMessagesSlice.actions;
