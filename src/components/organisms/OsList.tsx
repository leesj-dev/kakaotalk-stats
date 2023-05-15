import React from "react";
import Img from "../atoms/Img";
import Span from "../atoms/Span";
import styled from "styled-components";

const OsIconBox = styled.ul`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 50px;
`;

const OsListBox = styled.li<{ size?: string }>`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;

  > :first-child {
    margin-bottom: 5px;
    width: ${(props) => props.size || "50px"};
    height: ${(props) => props.size || "50px"};
  }

  &:hover {
    box-shadow: 0px 0px 9px 3px ${(props) => props.theme.mainBlue};
  }

  &.active {
    box-shadow: 0px 0px 7px 1px ${(props) => props.theme.mainBlue};
  }
`;

interface OsData {
  id: number;
  src: string;
  os: string;
}

const osData = [
  {
    id: 1,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/window.png"}`,
    os: "Window",
  },
  {
    id: 2,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/mac.png"}`,
    os: "MacOS",
  },
  {
    id: 3,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/android.png"}`,
    os: "Android",
  },
  {
    id: 4,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/ios.png"}`,
    os: "IOS",
  },
];

type OsListProps = {
  size?: string;
  setSelectedOsIndex: (index: number) => void;
  selectedOsIndex: number | null;
};

const OsList = ({ size, selectedOsIndex, setSelectedOsIndex }: OsListProps) => {
  return (
    <OsIconBox>
      {osData.map((data: OsData) => {
        return (
          <OsListBox
            key={data.id}
            className={`${selectedOsIndex === data.id && "active"}`}
            size={size}
            onClick={() => setSelectedOsIndex(data.id)}
          >
            <Img src={data.src} />
            <Span>{data.os}</Span>
          </OsListBox>
        );
      })}
    </OsIconBox>
  );
};

export default OsList;
