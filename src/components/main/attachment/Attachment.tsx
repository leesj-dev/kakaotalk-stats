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

const Attachment = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<any>("");
  const [imgBase64, setImgBase64] = useState<string[]>([]);

  const handleChangeFile = (event: any) => {
    console.log(event.target.files);
    setFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        reader.onloadend = () => {
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            const base64Sub = utf8Decode(base64.toString());
            console.log(base64Sub);

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
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/ad.txt");
        const data = await response.text();
        console.log(data); // 파일의 내용 출력
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <AttachmentBox>
      <List>
        <Label>
          <FileInput type="file" id="file" onChange={handleChangeFile} multiple />
          <AttachmentButton onClick={handleFileRead}>첨부</AttachmentButton>
          <p>{fileContent}</p>
        </Label>
        <CancelButton>X</CancelButton>
      </List>
    </AttachmentBox>
  );
};

export default Attachment;
