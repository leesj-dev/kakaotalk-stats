import { configureStore } from "@reduxjs/toolkit";
import { limitTimeSlice } from "./reducer/limitTimeSlice";
import { analyzedMessagesSlice } from "./reducer/analyzedMessagesSlice";
import { selectedRoomIndexSlice } from "./reducer/selectedRoomIndexSlice";
import { averageReplyTimeSlice } from "./reducer/averageReplyTimeSlice";
import { nfKeywordCountsSlice } from "./reducer/nfKeywordCountSlice";

export default configureStore({
  reducer: {
    analyzedMessagesSlice: analyzedMessagesSlice.reducer,
    selectedRoomIndexSlice: selectedRoomIndexSlice.reducer,
    limitTimeSlice: limitTimeSlice.reducer,
    averageReplyTimeSlice: averageReplyTimeSlice.reducer,
    nfKeywordCountsSlice: nfKeywordCountsSlice.reducer,
  },
});
