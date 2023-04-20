import { configureStore } from "@reduxjs/toolkit";
import { analyzedMessagesSlice } from "./reducer/messageSlice";

export default configureStore({
  reducer: {
    analyzedMessagesSlice: analyzedMessagesSlice.reducer,
  },
});
