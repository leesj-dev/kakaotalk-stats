import Moment from "moment";

// 업로드 시간 셋팅
export const displayCreatedAt = (createdDate: string | number | Date) => {
  const today = Moment(); // 현재 시간
  const formattedDate = Moment(createdDate, "YYYY. M. D. A h:mm:ss").utc().format();
  const timeValue = Moment(formattedDate); // 게시물 시간

  // 분 화
  const betweenTime = today.diff(timeValue, "minutes");

  // 1분 미만 = 방금 전
  if (betweenTime < 1) return "방금 전";
  // 1시간 미만 = ~분 전
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }
  // 시간 화
  const betweenTimeHour = today.diff(timeValue, "hours");
  // 24시간 미만 = ~시간 전
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }
  // 24시간 이상 = YYYY년 MM월 DD일
  return timeValue.format("Y년 M월 D일");
};
