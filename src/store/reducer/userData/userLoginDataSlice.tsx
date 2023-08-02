import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../../@types/index.d";

const initialState: UserData = {
  userId: "",
  nickname: "",
};

export const userLoginDataSlice = createSlice({
  name: "userLoginData",
  initialState,
  reducers: {
    setUserLoginDataSlice: (state, action: PayloadAction<UserData>) => {
      return action.payload;
    },
  },
});

export let { setUserLoginDataSlice } = userLoginDataSlice.actions;
