import React from "react";
import Span from "../../atoms/Span";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOsIndex } from "../../../store/reducer/attachment/selectedOsIndexSlice";
import { AiFillWindows, AiFillApple, AiFillAndroid } from "react-icons/ai";
import { SiIos } from "react-icons/si";
import Icon from "../../atoms/Icon";
import { lightTheme } from "../../../style/Theme";
import { FlexCenterDiv, FlexColumnCenterDiv } from "../../atoms/FlexDiv";
import { borderRadius } from "../../../style/css/borderRadius";

const OsListBox = styled(FlexCenterDiv)`
  margin: 0 auto;
  gap: 2.5rem;
  transition: 0.3s;
  flex-wrap: wrap;
  @media (max-width: 540px) {
    gap: 2rem;
  }
`;

const OsIconBox = styled(FlexColumnCenterDiv)`
  padding: 1rem;
  border-radius: ${borderRadius.weak};
  cursor: pointer;

  &:hover {
    > * {
      color: ${(props) => props.theme.mainBlueHover};
    }
    box-shadow: 0px 0px 9px 3px ${(props) => props.theme.mainBlue};
  }
  &.active {
    > * {
      color: ${(props) => props.theme.mainBlue};
    }
    box-shadow: 0px 0px 7px 1px ${(props) => props.theme.mainBlue};
  }
  &.dark {
    &:hover {
      box-shadow: none;
      color: #fff;
      background: #888888;
    }
    &.active {
      box-shadow: none;
      color: #fff;
      background: #555555;
    }
  }
  @media (max-width: 540px) {
    padding: 0.5rem;
  }
`;

const OsRowBox = styled.div`
  display: flex;
  gap: 2.5rem;
  @media (max-width: 540px) {
    gap: 2rem;
  }
`;

const OsIcon = styled(Icon)`
  width: 6.5rem;
  font-size: 6rem;
  @media (max-width: 540px) {
    font-size: 5rem;
  }
`;

const OsIconName = styled(Span)``;

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

const OsList = () => {
  const dispatch = useDispatch();
  const selectedOsIndex = useSelector(
    (state: { selectedOsIndexSlice: number }) => state.selectedOsIndexSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  const handleClickOsIcon = (id: number) => {
    dispatch(setSelectedOsIndex(id));
  };

  const renderOsIcons = (start: number, end: number) => {
    return osData.slice(start, end).map((data: OsData) => (
      <OsIconBox
        as="li"
        key={data.id}
        className={`${selectedOsIndex === data.id ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
        onClick={() => handleClickOsIcon(data.id)}
      >
        <OsIcon color={`${selectedOsIndex === data.id ? lightTheme.mainBlue : ""}`}>{data.icon}</OsIcon>
        <OsIconName>{data.os}</OsIconName>
      </OsIconBox>
    ));
  };

  return (
    <OsListBox>
      <OsRowBox as="ul">{renderOsIcons(0, 2)}</OsRowBox>
      <OsRowBox as="ul">{renderOsIcons(2, 4)}</OsRowBox>
    </OsListBox>
  );
};

export default OsList;
