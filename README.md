# SAFACY 🔐 - safe + privacy

<img src = "./assets/splash.png" width="500" height="250">

✅ Safe하고 싶지만, 나의 Privacy도 중요한 유저를 위한 앱

✅ 자주 연락하기 어려운 학생, 직장인들을 위한 위치공유 안심 서비스

모든 위치를 공유하는 앱을 사용하던 시절 지정된 시간에만 지정한 친구에게만 나의 위치를 공유하면 좋겠다 라는 경험을 기반으로,  
Safety(안심)과 Privacy(개인정보)를 모두 충족시킬 수 있는 서비스 Safacy 앱을 기획하게 되었습니다.

#

### `📆 전체 일정`

> [개인블로그](https://velog.io/@choisy/series/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8) - 개발 중 작성한 회고록(일기)입니다

**STEP 1. 기획** (2022.02.21 ~ 2021.02.27)

- 아이디어 브레인 스토밍
- 기획 : [KANBAN](https://www.notion.so/KANBAN-47c02f609fe64356a70725e1af3116f2)
- 목업 : [MOCUPS](https://app.moqups.com/jnrQ3UoEeDt8ARcn8QzwxsrVMODKMW1D/view/page/abd5b553e)
- Schema : [LUCIDE CHART](https://lucid.app/lucidchart/376e21f8-ec98-4572-a510-802917ec0dbf/edit?invitationId=inv_739dd0c1-a2d0-4a2a-a300-183c0ad96d54)

**STEP 2. 개발 및 배포** (2022.02.28 ~ 2021.03.11)

- 기능 구현
- Test code / README 작성
- FE/BE 배포

#

### `🛠 Tech stack`

**FrontEnd**

- React-native (expo)
- React Navigation (v6)
- Redux
- Redux-toolkit
- Redux-thunk
- socket.io-client
- Google Maps API

**BackEnd**

- Node JS
- Express
- MongoDB, Mongoose
- Socket.io

**Testing**

- FrontEnd: jest
- BackEnd : supertest, jest

#

### `📌 프로젝트 설명`

</br>

> ### 🔗 **[SAFACY APP DEMO 영상 ](https://safacy.s3.ap-northeast-2.amazonaws.com/Demo_safacy.mp4)**

</br>

<img src = "./assets/img/README/private.png" width="100" height="200">
<img src = "./assets/img/README/public setting.png" width="100" height="200">
<img src = "./assets/img/README/public.png" width="100" height="200">
<img src = "./assets/img/README/friend safacy.png" width="100" height="200">
<img src = "./assets/img/README/simulator.gif" width="100" height="200">

- **PRIVATE PAGE**  
  위치가 공유되지 않는 상태입니다.
  Share my Location을 활성화시키면, Safacy 앱의 메인 기능인 Public Mode로 전환됩니다.

- **SETTING PAGE**  
  Public Mode가 활성화 되면, 이동하려는 Destination (현재위치도 가능), 허용 가능한 Radius, 소요 시간 Time, 공유할 Friends 를 설정하고 Start버튼을 누르면 Public Mode가 시작됩니다.

- **PUBLIC PAGE**  
  유저의 위치가 공유되는 상태입니다. 유저의 위치 상태에 따라 SafacyBot 은 알람을 보내게 되고, SafacyBot 채팅창에 나타납니다. SafacyBot이 알람을 보내면 공유받은 친구는 push notification을 받게 됩니다. 자세한 SafacyBot의 동작 원리는 아래 링크를 확인해주세요.  
  [🤖 SAFACYBOT ALGORITHM](https://www.notion.so/d76a615fd2f54532909704de3d30d133)

- **FRIEND SAFACY**  
  친구가 공유한 페이지와 같은 지도 & 설정이 보이며, 실시간으로 이동하는 친구의 위치를 확인할 수 있습니다. 만일 SafacyBot의 알람메시지에 따른 위험을 감지하게 되었을 때 SOS 버튼을 통해, 현재 친구의 위치를 119에 문자로 전송하여 구조요청을 할 수 있습니다.

#

### `🏷 How to use`

**FrontEnd**

> https://gitlab.com/choisy_9619/safacy-frontend

- 프로젝트 root 디렉토리에 .env파일을 생성한 후, 아래 형식에 맞게 환경변수 값 설정

  ```(javascript)
  BASE_URI={LOCALHOST_URI}
  GOOGLE_IOS_CLIENT_ID={GOOGLE_IOS_CLIENT_ID}
  GOOGLE_MAP_API={GOOGLE_MAP_API}
  MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN}
  ```

**BackEnd**

> https://gitlab.com/choisy_9619/safacy-backend

- 프로젝트 root 디렉토리에 .env파일을 생성한 후, 아래 형식에 맞게 환경변수 값 설정

  ```(javascript)
  MONGODB_URI={MONGODB_URI}
  ```

#

### `💡 My Topics`

<h3><U>1. React native - Navigation & Axios 비동기 처리</U></h3>

Axios 비동기 처리를 진행하고 바로 navigation으로 해당 screen으로 이동했을 때, 아직 pending 상태에서 화면이동이 발생하여 pending동안은 이전 데이터를 갖고 있는 화면이 렌더링되고, fulfilled 되었을 때 원하는 업데이트된 화면이 렌더링 되는 현상이 지속되었습니다. 네트워크 환경이 원활한 경우 이런 현상이 적었지만, 항상 좋은 환경에서만 구동되는 것은 아니기 때문에 대책이 필요했습니다.

- 첫번째 방법 > React Native Debugger를 활용하여 pending, fulfilled 상태 변화를 확인했고, 그 경우에 따라 state에 다른 status(상태)를 부여해주었습니다. status에 따라 다음 screen 렌더링을 분기처리 해주었습니다.

- 두번째 방법 > Axios 비동기 처리가 fulfilled 되었을 경우에만 navigation이 일어나도록 핸들링해주었습니다.

React native는 리액트(Web)의 접근방법을 모바일(App)으로 확장한 FACEBOOK 오픈소스 프로젝트입니다. 따라서 공통점과 차이점이 존재했고, 가장 크게 느껴졌던 차이점은 screen 이동시 Router방식을 사용하는 React와 달리 리액트 네이티브는 Navigation 방법을 사용해야 했습니다. 저는 Stack Navigation을 사용했고, stack구조로 screen이 쌓여가면서 예상하지 못한 에러를 만나게 되었습니다. 그중에서 화면 전환 시 기존의 데이터가 남아있는 현상을 해결하기 위해, re-rendering 방법을 생각하게 되었고, 특히 비동기 처리 후 스크린 전환이 많았던 제 프로젝트에서는 이에 대한 대책이 꼭 필요했습니다. 이를 위해 저는 비동기 처리가 모두 완료된 후 screen이동을 진행했고, 이 때 state 변화를 통해 re-rendering을 시켜주어 네트워크 환경에 구애받지 않는 APP을 구현하였습니다.

리액트 네이티브 개발을 시작하며 마주친 가장 첫 문제였고, 꼭 알아야되는 개념이기에 이 문제를 차근차근 해결해나가는 과정이 리액트 네이티브에 더욱 익숙해질 수 있었습니다.

</br>

<h3><U>2. Location & SafacyBot sharing</U></h3>
저의 초기 기획과 개발단계에서 친구와 공유하게 될 부분인 Map, safacyBot message 데이터를 server쪽에서 다루지 않고, state로 관리하면서 로그인한 유저에 따라 분기처리하여 보여주려했습니다. 하지만 이 방법은 코드를 굉장히 복잡하게 만들었고, 특히 위치 정보에 혼선이 생겨 엄청난 에러가 발생했습니다. 이를 위해서 저는 지정된 정보 (Safacy setting시 결정하는 destination, radius, time 등)는 따로 server에 저장하고, 실시간으로 변화하는 부분(user의 이동, 이동에 따른 safacyBot의 메시지)은 Socket.io 통신으로 구현하였습니다. 기획단계에서 미처 생각하지 못한 부분이어서 개발 중간에 서버구조를 대폭 변경하는 시간이 필요했지만, 데이터를 처리하는 방법에 대해 배울 수 있는 계기가 되었습니다.

</br>

<h3><U>3. Redux-thunk</U></h3>
이전 팀프로젝트에서 사용한 React Query와 달리 저는 이번에 Redux-toolkit의 createAsyncThunk를 활용하여 비동기를 처리했습니다.

- Redux-thunk를 선정한 이유: 접해보지 못한 redux thunk를 사용해보고 싶었고, Redux toolkit 내부적으로 thunk 기능을 갖고 있으며 createAsncThunk로 컴포넌트 외부에서 비동기처리를 하여 관심사 분리에 용이하다는 공식문서의 내용을 보았기 때문이었습니다. 사용하면서 react query와 달리 간단하게 관심사를 분리할 수 있었고, 비동기 처리에 대한 status 또한 확실히 분리할 수 있어서 debugging에 편리함을 느낄 수 있었습니다. 그리고 결과적으로 개발 속도가 향상되었습니다.

React query는 redux-thunk와 다른 의미로 관심사를 분리하는 메소드라고 생각합니다. 자세히보면 redux 자체는 global state라는 공통된 저장소를 만들어 모든 컴포넌트들이 데이터를 접근 사용할 수 있는 기능을 갖고 있는데, redux에게 비동기처리 업무까지 맡긴다는 건 관심사가 확실히 분리되지 않는다고 볼 수 있습니다. 따라서 비동기 처리를 react의 useQuery를 사용하여 구현하는 것이 좋게 보여질 수 있을 것이라 생각했습니다. 하지만 직접 redux-thunk를 다뤄본 후, 읽기 좋은 코드가 좋은 코드라고 생각하는 저의 관점에서 Redux-thunk를 사용하였을 때 가독성과 데이터처리가 수월하게 느껴지기도 했다. 특히 비동기요청을 취소하는 등의 추가적인 기능이 가능한 점에서 만족도가 높았습니다.

Redux-thunk & React-query 서로 장단점이 있기 때문에 상황에 맞게 사용하는 것이 Best가 될 것이라 생각하게 되었습니다.

#

### `🔖 프로젝트를 마친 소감`

**기획단계 - 설렘 가득, 불안감도 함께**

이전부터 앱 App을 개발해보고 싶었기에 기획 (아이디어, 칸반, 목업, 스키마)하는 순간순간이 설렘으로 가득했습니다. 여러 아이디어들이 샘솟듯이 떠올랐고, 구현된 저의 App을 상상하며 공부하는 시간이 즐겁게 느껴졌습니다. 하지만 홀로서기의 시작! “내가 구현할 수 있을까? 혼자 할 수 있을까?” 라는 생각과 함께 불안감이 공존하는 시간이었습니다. 상상만 해오던 기능들을 구현할 수 있을지, web과 다른 점에서 오는 러닝커브가 높지 않을지 등등 이런 생각과 함께 개발단계를 시작하게 되었습니다.

**개발단계 - 험난했지만, 벽을 부수는 만족감, 그래도 해보자!**

역시나 기획단계부터 예상했던 많은 난관이 있었습니다. 혼자서 해결해야 한다는 책임감과 함께 구현하지 못했을 때의 걱정이 반복되었습니다. 어려움을 겪을 때마다 켄님, 멘토님들, 팀프로젝트 팀원들이 많은 힘을 주었던 것이 생각났고, 마음이 약해지는 시기가 있었습니다. 하지만 “그래도 해보자!"라는 생각으로 차근차근 해나갔습니다. 그리고 Task라는 벽을 깨부순다는 느낌이 들어서 만족감도 크게 느껴졌습니다. 한단계 나갈때마다 큰 벽이 있었지만, 그동안 바닐라코딩의 부트캠프 기간동안 배웠던 지식, 문제 해결 능력을 활용하는 시간이었다고 생각합니다.

**완성도를 향해**

이번 프로젝트에서 저의 목표는 **완성도** 였습니다. 이를 위해 기획에 많은 노력을 들였습니다. 하지만 생각하지 못한 다양한 기술적, 기획적 변수들이 존재했고, 유저들의 입장에서 불편함을 느낄 수 있는 여러 에러들이 발생했습니다. 그렇게 Schema 구조가 처음 기획에서 달라지고, 백엔드를 전반적으로 수정해야하는 일이 발생했습니다. 예상하지 못한 기획변경으로 소요된 시간이 많았고, 세밀한 에러 핸들링이 되지 않은 점에 아쉬움이 남습니다. 하지만 이런 경험이 다음 프로젝트 기획단계에서 미리 고려할 항목이 될 것이라 생각합니다.

바닐라코딩 부트캠프 시간동안 정말 많은 분들께 도움을 받았습니다.  
이 도움을 발판으로 새로운 환경에서 새로운 프로젝트를 진행할 때 하루하루 발전하는 개발자가 되겠습니다.
