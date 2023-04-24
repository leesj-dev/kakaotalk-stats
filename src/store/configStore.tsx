import { configureStore } from "@reduxjs/toolkit";
import { limitTimeSlice } from "./reducer/limitTimeSlice";
import { analyzedMessagesSlice } from "./reducer/messageSlice";
import { selectedRoomIndexSlice } from "./reducer/selectedRoomIndexSlice";

export default configureStore({
  reducer: {
    analyzedMessagesSlice: analyzedMessagesSlice.reducer,
    selectedRoomIndexSlice: selectedRoomIndexSlice.reducer,
    limitTimeSlice: limitTimeSlice.reducer,
  },
});
