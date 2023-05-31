import { configureStore } from "@reduxjs/toolkit";
import { limitTimeSlice } from "./reducer/limitTimeSlice";
import { analyzedMessagesSlice } from "./reducer/analyzedMessagesSlice";
import { selectedRoomIndexSlice } from "./reducer/selectedRoomIndexSlice";
import { averageReplyTimeSlice } from "./reducer/averageReplyTimeSlice";
import { nfKeywordCountsSlice } from "./reducer/nfKeywordCountSlice";
import { mostChattedTimesSlice } from "./reducer/mostChattedTimes";
import { selectedSpeakerIndexSlice } from "./reducer/selectedSpeakerIndexSlice";
import { speakersTopNKeywordsSlice } from "./reducer/speakersTopNKeywordsSlice";
import { attachedFileListSlice } from "./reducer/attachedFileListSlice";
import { selectedOsIndexSlice } from "./reducer/selectedOsIndexSlice";
import { isAnalyzedMessagesExistSlice } from "./reducer/isAnalyzedMessagesExistSlice";
import { volumeHourlyBoxSizeSlice } from "./reducer/volumeHourlyBoxSizeSlice";
import { isDarkModeSlice } from "./reducer/isDarkModeSlice";

export default configureStore({
  reducer: {
    analyzedMessagesSlice: analyzedMessagesSlice.reducer,
    selectedRoomIndexSlice: selectedRoomIndexSlice.reducer,
    limitTimeSlice: limitTimeSlice.reducer,
    averageReplyTimeSlice: averageReplyTimeSlice.reducer,
    nfKeywordCountsSlice: nfKeywordCountsSlice.reducer,
    speakersTopNKeywordsSlice: speakersTopNKeywordsSlice.reducer,
    mostChattedTimesSlice: mostChattedTimesSlice.reducer,
    selectedSpeakerIndexSlice: selectedSpeakerIndexSlice.reducer,
    attachedFileListSlice: attachedFileListSlice.reducer,
    selectedOsIndexSlice: selectedOsIndexSlice.reducer,
    isAnalyzedMessagesExistSlice: isAnalyzedMessagesExistSlice.reducer,
    volumeHourlyBoxSizeSlice: volumeHourlyBoxSizeSlice.reducer,
    isDarkModeSlice: isDarkModeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true, // 불변성 체크 활성화
      serializableCheck: false, // 직렬화 체크 비활성화
    }),
});
