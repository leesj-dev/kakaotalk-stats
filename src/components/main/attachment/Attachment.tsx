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
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString();

            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)
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
