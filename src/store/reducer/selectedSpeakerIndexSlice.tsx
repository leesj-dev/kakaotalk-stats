import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

export const selectedSpeakerIndexSlice = createSlice({
  name: "selectedRoomIndex",
  initialState,
  reducers: {
    setSelectedSpeakerIndex: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state = action.payload;
      return state;
    },
  },
});

export let { setSelectedSpeakerIndex } = selectedSpeakerIndexSlice.actions;
