import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import { BsGithub, BsEnvelope } from "react-icons/bs";
import Icon from "../atoms/Icon";
import Anchor from "../atoms/Anchor";
import { useNavigate } from "react-router";

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.footerBackground};
  padding: 60px 0 60px 0;
`;
const ContentBox = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 1200px;
`;

const HeadBox = styled.div`
  margin-bottom: 20px;
`;

const LogoImageBox = styled.div`
  width: 120px;
  height: 40px;
  cursor: pointer;
`;

const DeveloperDescriptionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: 30px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DeveloperBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;
`;

const ProjectNameBox = styled.div`
  padding-top: 10px;
`;

const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterContainer>
      <ContentBox>
        <DeveloperDescriptionBox>
          <DeveloperBox>
            <IconContainer>
              <Anchor href="https://github.com/youngentry">
                <Icon fontSize="22px">
                  <BsGithub />
                </Icon>
              </Anchor>
              <Anchor href="mailto:example@example.com">
                <Icon fontSize="22px">
                  <BsEnvelope />
                </Icon>
              </Anchor>
            </IconContainer>

            <Span fontSize="16px">youngentry</Span>
          </DeveloperBox>
          <DeveloperBox>
            <IconContainer>
              <Anchor href="https://github.com/juhee067">
                <Icon fontSize="22px">
                  <BsGithub />
                </Icon>
              </Anchor>
              <Anchor href="mailto:juhee067@gmail.com">
                <Icon fontSize="22px">
                  <BsEnvelope />
                </Icon>
              </Anchor>
            </IconContainer>

            <Span fontSize="16px">juhee067</Span>
          </DeveloperBox>
        </DeveloperDescriptionBox>
        <ProjectNameBox>
          <Span fontSize="14px" color="gray">
            카카오 돋보기(Kakao Magnifying Glass) 2023
          </Span>
        </ProjectNameBox>
        {/* <HeadBox>
          <LogoImageBox onClick={() => navigate("/")}>
            <Img src={process.env.PUBLIC_URL + "/images/logo.png"} />
          </LogoImageBox>
        </HeadBox> */}
      </ContentBox>
    </FooterContainer>
  );
};

export default Footer;
