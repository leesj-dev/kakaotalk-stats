import styled from "styled-components";

export const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexCenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const FlexColumnCenterDiv = styled(FlexCenterDiv)`
  flex-direction: column;
`;

export const FlexRowCenterDiv = styled(FlexCenterDiv)`
  flex-direction: row;
`;
