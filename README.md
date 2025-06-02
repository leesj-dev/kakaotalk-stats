
# 카카오톡 대화 분석 시각화 웹사이트
![](./public/images/logo/logoWhite.png)

카카오톡 메시지를 분석하여 대화 패턴을 그래프와 차트 형태로 시각화 해주는 웹사이트입니다.

원작자 [KakaoMagnifyingGlass](https://github.com/KakaoMagnifyingGlass/KMG)가 더 이상 호스팅하고 있지 않기 때문에 fork한 후, **<u>로그인 및 게시판 기능은 제거하여 백엔드 없이 Github Pages에서 정적 페이지로 호스팅하고 있습니다</u>**.

## 주요 기술 스택
|Subject|Stack|
|:---|:---|
 |View|<img src="https://img.shields.io/badge/react-282C34?style=for-the-badge&logo=react&logoColor=#61DAFB"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">|
 |State Management|<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">|
 |CSS|<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">|
 |Code Quality|<img src="https://img.shields.io/badge/prettier-2C414F?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">|
 |Design Tool|<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">|
  
## 사이트 URL
- ### http://kmg-env-1.eba-332qe2dv.ap-northeast-2.elasticbeanstalk.com/

## 주요 기능
![kmg-dashboard](https://github.com/KakaoMagnifyingGlass/KMG/assets/90388461/38d125ea-b43b-41dd-97f9-4e3815c49038)

- 채팅방 비교: 채팅방별 카톡 횟수, 평균답장속도, 인원 수, 대화 기간, 이모티콘이나 사진 공유 횟수를 비교합니다.
- 대화량: 일간 대화량을 파악할 수 있습니다.
- 대화 비율: 일간 대화 비율을 파악할 수 있습니다.
- 키워드: 이용자별로 자주 사용하는 대화 키워드를 확인할 수 있습니다.
- 답장속도: 누구의 답장속도가 빠르고 느린지 일별로 파악할 수 있습니다.
- 시간대: 카톡을 자주 나누는 요일과 시간대를 확인할 수 있습니다.

## 대화 분석 방법
![](./public/demo.gif)
- 웹사이트에 접속합니다.
- 메신저 대화 파일을 첨부합니다.
- "분석 시작" 버튼을 클릭하여 분석을 시작합니다.
- 결과를 그래프와 차트로 확인합니다.

