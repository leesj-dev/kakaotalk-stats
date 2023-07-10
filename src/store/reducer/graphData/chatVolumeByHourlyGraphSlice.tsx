import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: any[] = [];

export const chatVolumeByHourlyGraphSlice = createSlice({
  name: "ChatVolumeBtyHourlyGraph",
  initialState,
  reducers: {
    setChatVolumeByHourlyGraphSlice: (state, action: PayloadAction<any[]>) => {
      return action.payload;
    },
  },
});

export let { setChatVolumeByHourlyGraphSlice } = chatVolumeByHourlyGraphSlice.actions;
