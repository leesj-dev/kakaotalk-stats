import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { FileObject } from "../../@types/index.d";

const initialState: FileObject[][] = [];

export const attachedFileListSlice = createSlice({
  name: "attachedFileListSlice",
  initialState,
  reducers: {
    setAttachedFileList: (state, action: PayloadAction<FileObject[][]>) => {
      state = action.payload;
      return state;
    },
  },
});

export let { setAttachedFileList } = attachedFileListSlice.actions;
