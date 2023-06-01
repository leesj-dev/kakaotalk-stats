import React from "react";
import Img from "../atoms/Img";
import Span from "../atoms/Span";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOsIndex } from "../../store/reducer/selectedOsIndexSlice";
import { AiFillWindows, AiFillApple, AiFillAndroid } from "react-icons/ai";
import { SiIos } from "react-icons/si";
import Icon from "../atoms/Icon";
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

  &.dark {
    &:hover {
      box-shadow: none;
      background: #888888;
    }

    &.active {
      box-shadow: none;
      background: #555555;
    }
  }
`;

const osData = [
  {
    id: 1,
    icon: <AiFillWindows />,
    os: "Window",
  },
  {
    id: 2,
    icon: <AiFillApple />,
    os: "MacOS",
  },
  {
    id: 3,
    icon: <AiFillAndroid />,
    os: "Android",
  },
  {
    id: 4,
    icon: <SiIos />,
    os: "IOS",
  },
];
interface OsData {
  id: number;
  icon: JSX.Element;
  os: string;
}

type OsListProps = {
  size?: string;
};

const OsList = ({ size }: OsListProps) => {
  const dispatch = useDispatch();

  const selectedOsIndex = useSelector(
    (state: { selectedOsIndexSlice: number }) => state.selectedOsIndexSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  return (
    <OsIconBox>
      {osData.map((data: OsData) => {
        return (
          <OsListBox
            key={data.id}
            className={`${selectedOsIndex === data.id ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
            size={size}
            onClick={() => dispatch(setSelectedOsIndex(data.id))}
          >
            <Icon fontSize="50px" color="#2da0fa">
              {data.icon}
            </Icon>
            <Span>{data.os}</Span>
          </OsListBox>
        );
      })}
    </OsIconBox>
  );
};

export default OsList;
