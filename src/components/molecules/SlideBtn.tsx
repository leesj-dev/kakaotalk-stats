import React from "react";
import { FiArrowUp } from "react-icons/fi";
import Icon from "../atoms/Icon";
interface Props {
  direction: "up" | "down";
  onClick: () => void;
}
const SlideBtn = ({ direction, onClick }: Props) => {
  return (
    <Icon fontSize="24px" onClick={onClick}>
      <FiArrowUp />
    </Icon>
  );
};

export default SlideBtn;
