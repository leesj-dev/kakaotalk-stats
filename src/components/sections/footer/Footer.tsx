import React from "react";
import styled from "styled-components";
import { BsGithub, BsEnvelope } from "react-icons/bs";
import Icon from "../../atoms/Icon";
import Anchor from "../../atoms/Anchor";
import { FlexCenterDiv, FlexColumnCenterDiv } from "../../atoms/FlexDiv";
import Span from "../../atoms/Span";
import { zIndex } from "../../../style/specifiedCss/zIndex";

const FooterContainer = styled.div`
  position: relative;
  padding: 6rem 0;
  background: var(--footerBackground);
  z-index: ${zIndex.footer};
`;

const ContentBox = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
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

const Footer = () => {
  return (
    <FooterContainer>
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
        <ProjectName>카카오 돋보기(Kakao Magnifying Glass) 2023</ProjectName>
      </ContentBox>
    </FooterContainer>
  );
};

export default Footer;
