import { type } from "os";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

const AttachmentBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const List = styled.ul``;
const Label = styled.label``;
const FileInput = styled.input``;
const AttachmentButton = styled.div``;
const CancelButton = styled.div``;

const utf8Decode = (base64String: string) => {
  const bytes = atob(base64String.replace(/^data:.*?;base64,/, ""));
  return decodeURIComponent(escape(bytes));
};

/**
 * txtFile을 넣으면 [{},{},{},{}] 형태의 데이터 반환
 * @param {"txtFile"[]} txtFiles
 * @returns {object[]}
 */
const breakdownTxtFile = (message: string) => {
  const allMessageData = [];
  try {
    const allLineArray = message.split("\n20");

    const filteredMessageLineArray = allLineArray.filter((line) => {
      return filterMessageLine(line);
    });

    allMessageData.push(getDataArrayFromLineArray(filteredMessageLineArray));
  } catch (error) {
    console.error(error);
  }
  return allMessageData.flat();
};

/**
 * txt파일에서 추출한 str을 넣으면 라인을 담은 배열 반환
 * @param {string} line
 * @returns {array[]}
 */
const filterMessageLine = (line: string) => {
  line = line.trim();

  if (!(parseInt(line.slice(0, 2)) < 100 && line.slice(2, 4) === ". ")) {
    return false;
  }
  return line;
};

/**
 * 라인을 데이터로 반환
 * @param {string[]} filteredMessageLineArray
 * @returns {object[]}
 */
const getDataArrayFromLineArray = (filteredMessageLineArray: string[]) => {
  const result = filteredMessageLineArray.map((line: String) => {
    const [dateTime, content] = line.split(", ", 2);
    const [year, month, day, time] = dateTime.split(". ");
    let [fullHour, minute] = time.split(":");
    let [meridiem, hour] = fullHour.split(" ");
    if (hour === "12") hour = "0";
    const [speaker, message] = content.split(" : ");
    const keywords = message.split(" ").map((word) => word.trim());

    return {
      year: formatValue(year),
      month: formatValue(month),
      day: formatValue(day),
      hour: meridiem === "오전" ? formatValue(parseInt(hour)) : (parseInt(hour) + 12).toString(),
      minute: formatValue(parseInt(minute)),
      speaker,
      keywords,
    };
  });
  return result;
};

const formatValue = (value: String | Number) => {
  return value.toString().padStart(2, "0");
};

type MessageData = {
  day: string;
  hour: string;
  minute: string;
  month: string;
  speaker: string;
  year: string;
  keywords: string[];
};

type DateInfo = {
  date: string;
  data: {
    chatTimes: Record<string, number>;
    keywordCounts: Record<string, number>;
    replyTime: {
      previous: number;
      difference: number;
      count: number;
    };
  };
};

const getMessageData = (results: MessageData[]) => {
  const messageData = [];
  let rightBeforeSpeaker;
  let rightBeforeMessageTime;

  for (const result of results) {
    const { year, month, day, hour, minute, speaker, keywords } = result;
    const todayDate = `${year}${month}${day}`;
    const currentTime = `${hour}:${minute}`;

    // speaker 찾기. 없다면? speaker와 date배열 추가하기
    let speakerIndex = messageData.findIndex((item) => item.speaker === speaker);
    if (speakerIndex === -1) {
      messageData.push({ speaker, date: [] });
      speakerIndex = messageData.length - 1;
    }

    // date에 current message date 있는지 찾기. 없다면? current message date, chatTimes: {} ,keywordCounts:{},replyTime:{} 추가하기
    let dates: DateInfo[] = messageData[speakerIndex].date;
    const lastMessageDate = dates.length && Object.keys(dates[dates.length - 1])[0];
    if (lastMessageDate !== todayDate) {
      dates.push({ date: todayDate, data: { chatTimes: {}, keywordCounts: {}, replyTime: { previous: 0, difference: 0, count: 0 } } });
    }

    // date정보의 마지막 요소에 current chat time있는지 찾기. 없다면? chatTimes object 추가하기, 있다면? chatTimes count++
    const todayDateValue = dates[dates.length - 1].data;
    const lastChatTime = todayDateValue.chatTimes[currentTime];
    lastChatTime ? todayDateValue.chatTimes[currentTime]++ : (todayDateValue.chatTimes[currentTime] = 1);

    // keywordCount있는지 찾기. 없다면? keywordCounts object 추가하기. 있다면? 키워드 또는 카운트 추가하기
    const keywordCountObject = todayDateValue.keywordCounts;
    for (const keyword of keywords) {
      keywordCountObject[keyword] ? keywordCountObject[keyword]++ : (keywordCountObject[keyword] = 1);
    }

    // 직전의 메시지가 현재 메시지와 다른사람일 경우, 현재 메시지 - 직전의 메시지 시간을 더하고 count++
    const minuteTime = parseInt(hour) * 60 + parseInt(minute);
    const replyTimeObject = todayDateValue.replyTime;

    if (rightBeforeSpeaker && rightBeforeSpeaker !== speaker) {
      const difference = minuteTime - (rightBeforeMessageTime || 0);
      replyTimeObject.difference += difference >= 0 ? difference : 0;
      replyTimeObject.previous = minuteTime;
      replyTimeObject.count++;
    }
    rightBeforeSpeaker = messageData[speakerIndex].speaker;
    rightBeforeMessageTime = minuteTime;
  }

  return messageData;
};

const Attachment = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<any>("");
  const [imgBase64, setImgBase64] = useState<string[]>([]);

  const [messageData, setMessageData] = useState<any>("");

  const handleChangeFile = (event: any) => {
    console.log(event.target.files);
    setFile(event.target.files);
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            const base64Sub = utf8Decode(base64.toString());
            const filteredMessages = breakdownTxtFile(base64Sub);
            console.log(filteredMessages);
            const messageData = getMessageData(filteredMessages);
            setMessageData(messageData);

            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  function handleFileRead(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileContent(reader.result);
    };
    reader.readAsText(file);
  }

  useEffect(() => {
    console.log(file);
  }, [file]);

  useEffect(() => {
    console.log(fileContent);
  }, [fileContent]);

  useEffect(() => {
    console.log(imgBase64);
  }, [fileContent]);

  useEffect(() => {
    console.log(messageData);
  }, [messageData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(process.env.PUBLIC_URL + "/ad.txt");
  //       const data = await response.text();
  //       console.log(data); // 파일의 내용 출력
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <AttachmentBox>
      <List>
        <Label>
          <FileInput type="file" id="file" onChange={handleChangeFile} multiple />
          <AttachmentButton onClick={handleFileRead}>첨부</AttachmentButton>
        </Label>
        <CancelButton>X</CancelButton>
        <div>
          {messageData &&
            messageData.map((data: any) => {
              return (
                <p>
                  <span>{data.speaker}</span>
                  <span>
                    {data.date.map((item: any) => {
                      const { chatTimes, keywordCounts, replyTime } = item.data;
                      const { count, difference, previous } = replyTime;
                      return (
                        <div>
                          {item.date}
                          {Object.keys(chatTimes)}
                          {Object.keys(keywordCounts)}
                          {count}
                          {difference}
                          {previous}
                        </div>
                      );
                    })}
                  </span>
                </p>
              );
            })}
        </div>
      </List>
    </AttachmentBox>
  );
};

export default Attachment;
