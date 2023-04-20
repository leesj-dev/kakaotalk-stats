import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { MessageData } from "../../components/main/attachment/Attachment";

const initialState: MessageData[] = [];

export const analyzedMessageSlice = createSlice({
  name: "analyzedMessage",
  initialState,
  reducers: {
    setAnalyzedMessage: (state, action: PayloadAction<MessageData[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export let { setAnalyzedMessage } = analyzedMessageSlice.actions;
