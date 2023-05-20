import { OriginMessageData } from "../../@types/index.d";

const regex = /^\d{2,4}\. \d{1,2}\. \d{1,2}\. (오후|오전) \d{1,2}:\d{1,2}, (.+?) : /;
const regexForWindow = /(.+?)\] \[(오후|오전) \d{1,2}:\d{1,2}] /;
const regexForMacOS = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},"(.+?)",/;
const regexForAndroid = /^\d{2}년 \d{1,2}월 \d{1,2}일 (오후|오전) \d{1,2}:\d{2}, (.+?) : /;

/**
 * txt파일에서 추출한 str을 넣으면 라인을 담은 배열 반환합니다.
 * @param {string} line - 추출한 문자열
 * @return {string|boolean} - 라인을 담은 배열 또는 false (라인이 유효하지 않은 경우)
 */
const filterMessageLine = (line: string) => {
  line = line.trim();
  if (!regex.test(line)) {
    return false;
  }
  return line;
};

/**
 * 라인 배열에서 데이터를 추출합니다.
 * @param {string[]} filteredMessageLineArray - 필터링된 라인 배열입니다.
 * @returns {Array<object>} - 라인 배열에서 추출된 데이터 객체의 배열입니다.
 */
const getDataObjectFromLines = (filteredMessageLineArray: string[]) => {
  const originMessageData: OriginMessageData[] = [];
  for (const line of filteredMessageLineArray) {
    const [dateTime, content] = line.split(", ", 2);
    const [year, month, day, time] = dateTime.split(". ");
    const [fullHour, minute] = time.split(":");
    const [meridiem, hour] = fullHour.split(" ");
    const hour12 = hour === "12" ? "0" : hour;
    const [speaker, message] = content.split(" : ");
    const keywords = message.split(" ").map((word) => word.trim());
    originMessageData.push({
      date: `${year.slice(-2)}${formatValue(month)}${formatValue(day)}`,
      hour: meridiem === "오전" ? formatValue(parseInt(hour12)) : (parseInt(hour12) + 12).toString(),
      minute: formatValue(minute),
      speaker,
      keywords,
    });
  }
  return originMessageData;
};

const formatValue = (value: String | Number) => {
  return value.toString().padStart(2, "0");
};

/**
 * base64 인코딩 스트링을 UTF-8로 디코딩합니다.
 * @param {string} base64String base64로 인코딩된 string
 * @returns {string} UTF-8로 디코딩된 string.
 */
export const utf8Decode = (base64String: string) => {
  const bytes = atob(base64String.replace(/^data:.*?;base64,/, ""));
  return decodeURIComponent(escape(bytes));
};

/**
 * 텍스트 파일을 받아 파싱하여 메시지 데이터를 반환합니다.
 * @param {string} base64 - base64 인코딩된 텍스트 파일
 * @returns {Array} 메시지 데이터 배열
 */
export const breakdownTxtFileIOS = (base64: string) => {
  const allMessageData = [];
  const decodedTextFile = utf8Decode(base64.toString());
  try {
    const allLineArray = decodedTextFile.split("\n20");
    const filteredMessageLineArray = allLineArray.filter((line) => filterMessageLine(line));

    allMessageData.push(getDataObjectFromLines(filteredMessageLineArray));
  } catch (error) {
    console.error(error);
  }

  return allMessageData.flat();
};

export const breakdownTxtFileWindow = (base64: string) => {
  const allMessageData = [];
  const decodedTextFile = utf8Decode(base64.toString());
  try {
    const allLineArray = decodedTextFile.split("\n--------------- 20");
    // 여기서 라인확인
    const filteredMessageLineArray = allLineArray.filter((line) => {
      return line.includes("요일 ---------------\r\n[");
    });
    const dateMessagePair = filteredMessageLineArray.map((item: string) =>
      item.split("요일 ---------------\r\n[")
    );
    const dateMessageObject = dateMessagePair.map((pair: string[]) => {
      // 여기서 스플릿할 때 문제가 생김
      return {
        date: pair[0],
        message: pair[1].split("\r\n[").filter((item) => {
          return regexForWindow.test(item);
        }),
      };
    });

    const transformedMessageLineArray = dateMessageObject.map((Object) => {
      const [year, month, day] = Object.date.split(" ", 3);
      const dateString = `${year.replace("년", ".")} ${month.replace("월", ".")} ${day.replace(
        "일",
        "."
      )}`;
      const speakerTimeMessageStringArray = Object.message.map((item) => {
        const [name, timeMessage] = item.split("] [", 2);
        const [time, message] = timeMessage.split("] ", 2);
        return `${dateString} ${time}, ${name} : ${message}`;
      });

      return speakerTimeMessageStringArray;
    });
    allMessageData.push(getDataObjectFromLines(transformedMessageLineArray.flat()));
  } catch (error) {
    console.error(error);
  }

  return allMessageData.flat();
};

export const breakdownTxtFileMacOS = (base64: string) => {
  const allMessageData = [];
  const decodedTextFile = utf8Decode(base64.toString());
  try {
    const allLineArray = decodedTextFile.split("\n");
    const filteredMessageLineArray: string[] = [];
    allLineArray.forEach((line: string) => {
      if (regexForMacOS.test(line)) {
        filteredMessageLineArray.push(line);
      } else {
        filteredMessageLineArray[filteredMessageLineArray.length - 1] += line;
      }
    });

    const transformedMessageLineArray = filteredMessageLineArray.map((line) => {
      let [dateTime, speaker, message] = line.split(",", 3);
      const [date, time] = dateTime.split(" ");
      let [year, month, day] = date.split("-");
      year = year.slice(2);
      let [hour, minute] = time.split(":", 2);

      if (Number(hour) > 12) {
        hour = `오후 ${Number(hour) - 12}`;
      } else if (hour === "00") {
        hour = `오전 12`;
      } else {
        hour = `오전 ${hour}`;
      }

      while (speaker[0] === '"' && speaker.length > 2) {
        speaker = speaker.slice(1, speaker.length - 1);
      }

      message = message.slice(1, message.length - 1);
      return `${year}. ${month}. ${day}. ${hour}:${minute}, ${speaker} : ${message}`;
    });

    allMessageData.push(getDataObjectFromLines(transformedMessageLineArray));
  } catch (error) {
    console.error(error);
  }

  return allMessageData.flat();
};

export const breakdownTxtFileAndroid = (base64: string) => {
  const allMessageData = [];
  const decodedTextFile = utf8Decode(base64.toString());
  try {
    const allLineArray = decodedTextFile.split("\n20");
    const filteredMessageLineArray = allLineArray.filter((line) => regexForAndroid.test(line));
    const transformedMessageLineArray = filteredMessageLineArray.map((item) => {
      const transformedItem = item.replace("년", ".").replace("월", ".").replace("일", ".");
      return transformedItem;
    });

    allMessageData.push(getDataObjectFromLines(transformedMessageLineArray));
  } catch (error) {
    console.error(error);
  }
  return allMessageData.flat();
};

export const readAsDataURL = (file: File) => {
  return new Promise<string | null>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string | null);
  });
};
