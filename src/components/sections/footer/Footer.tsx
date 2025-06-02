import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { BsGithub, BsEnvelope } from "react-icons/bs";
import Icon from "../../atoms/Icon";
import Anchor from "../../atoms/Anchor";
import { FlexCenterDiv, FlexColumnCenterDiv } from "../../atoms/FlexDiv";
import Span from "../../atoms/Span";
import { zIndex } from "../../../style/specifiedCss/zIndex";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  dashboard?: boolean;
}

const FooterContainer = styled.div<FooterProps>`
  position: relative;
  padding: 6rem 0;
  background: var(--footerBackground);
  transition: background 0.3s;
  z-index: ${zIndex.footer};
  ${(props) =>
    props.dashboard &&
    css`
      @media (max-width: 1200px) {
        min-width: 1180px;
      }
    `}
`;

const ContentBox = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  width: 100%;
  max-width: 1220px;
`;

const DeveloperDescriptionBox = styled(FlexCenterDiv)`
  width: 100%;
  gap: 30px;
`;

const DeveloperBox = styled(FlexColumnCenterDiv)`
  margin-bottom: 30px;
  gap: 5px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const AnchorIcon = styled(Icon)`
  font-size: 22px;
`;

const DeveloperNameSpan = styled(Span)`
  font-size: 16px;
`;

const ProjectName = styled(DeveloperNameSpan)`
  font-size: 14px;
`;

const DeveloperData = [
  {
    github: "https://github.com/youngentry",
    email: "mailto:gentry_@naver.com",
    name: "youngentry",
  },
  {
    github: "https://github.com/juhee067",
    email: "mailto:juhee067@gmail.com",
    name: "juhee067",
  },
];

const Footer = (props: FooterProps) => {
  return (
    <FooterContainer {...props}>
      <ContentBox>
        <DeveloperDescriptionBox>
          {DeveloperData.map((developer) => {
            return (
              <DeveloperBox key={developer.name}>
                <IconContainer>
                  <Anchor href={developer.github}>
                    <AnchorIcon>
                      <BsGithub />
                    </AnchorIcon>
                  </Anchor>
                  <Anchor href={developer.email}>
                    <AnchorIcon>
                      <BsEnvelope />
                    </AnchorIcon>
                  </Anchor>
                </IconContainer>
                <DeveloperNameSpan>{developer.name}</DeveloperNameSpan>
              </DeveloperBox>
            );
          })}
        </DeveloperDescriptionBox>
        <ProjectName>© 2023–2025 카카오돋보기</ProjectName>
      </ContentBox>
    </FooterContainer>
  );
};

export default Footer;
