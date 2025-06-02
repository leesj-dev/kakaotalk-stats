import React, { memo } from "react";
import { FlexCenterDiv } from "../../atoms/FlexDiv";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-left: auto;
  margin-right: 5.5rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Menus = styled(FlexCenterDiv)`
  font-size: 2rem;
  gap: 4rem;
`;

const NavMenus = ({ isAnalyzedMessagesExist }: { isAnalyzedMessagesExist: boolean }) => {
  return (
    <MenuBox>
      <Menus>
        {!isAnalyzedMessagesExist && <Link to="/demo">미리보기</Link>}
        <Link to="/attachment">분석하기</Link>
        {isAnalyzedMessagesExist && <Link to="/dashboard">대시보드</Link>}
        {isAnalyzedMessagesExist && <Link to="/detail">상세보기</Link>}
      </Menus>
    </MenuBox>
  );
};

export default memo(NavMenus);
