import { configureStore } from "@reduxjs/toolkit";
import { analyzedMessageSlice } from "./reducer/messageSlice";

export default configureStore({
  reducer: {
    analyzedMessageSlice: analyzedMessageSlice.reducer,
  },
});
