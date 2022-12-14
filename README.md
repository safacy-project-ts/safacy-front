# SAFACY ๐ - safe + privacy

<img src = "./assets/splash.png" width="500" height="250">

โ Safeํ๊ณ  ์ถ์ง๋ง, ๋์ Privacy๋ ์ค์ํ ์ ์ ๋ฅผ ์ํ ์ฑ

โ ์์ฃผ ์ฐ๋ฝํ๊ธฐ ์ด๋ ค์ด ํ์, ์ง์ฅ์ธ๋ค์ ์ํย ์์น๊ณต์  ์์ฌ ์๋น์ค

๋ชจ๋  ์์น๋ฅผ ๊ณต์ ํ๋ ์ฑ์ ์ฌ์ฉํ๋ ์์  ์ง์ ๋ ์๊ฐ์๋ง ์ง์ ํ ์น๊ตฌ์๊ฒ๋ง ๋์ ์์น๋ฅผ ๊ณต์ ํ๋ฉด ์ข๊ฒ ๋ค ๋ผ๋ ๊ฒฝํ์ ๊ธฐ๋ฐ์ผ๋ก,  
Safety(์์ฌ)๊ณผ Privacy(๊ฐ์ธ์ ๋ณด)๋ฅผ ๋ชจ๋ ์ถฉ์กฑ์ํฌ ์ ์๋ ์๋น์ค Safacy ์ฑ์ ๊ธฐํํ๊ฒ ๋์์ต๋๋ค.

#

### `๐ ์ ์ฒด ์ผ์ `

> [๊ฐ์ธ๋ธ๋ก๊ทธ](https://velog.io/@choisy/series/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8) - ๊ฐ๋ฐ ์ค ์์ฑํ ํ๊ณ ๋ก(์ผ๊ธฐ)์๋๋ค

**STEP 1. ๊ธฐํ** (2022.02.21 ~ 2021.02.27)

- ์์ด๋์ด ๋ธ๋ ์ธ ์คํ ๋ฐ
- ๊ธฐํ : [KANBAN](https://www.notion.so/KANBAN-47c02f609fe64356a70725e1af3116f2)
- ๋ชฉ์ : [MOCUPS](https://app.moqups.com/jnrQ3UoEeDt8ARcn8QzwxsrVMODKMW1D/view/page/abd5b553e)
- Schema : [LUCIDE CHART](https://lucid.app/lucidchart/376e21f8-ec98-4572-a510-802917ec0dbf/edit?invitationId=inv_739dd0c1-a2d0-4a2a-a300-183c0ad96d54)

**STEP 2. ๊ฐ๋ฐ ๋ฐ ๋ฐฐํฌ** (2022.02.28 ~ 2021.03.11)

- ๊ธฐ๋ฅ ๊ตฌํ
- Test code / README ์์ฑ
- FE/BE ๋ฐฐํฌ

#

### `๐  Tech stack`

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

### `๐ ํ๋ก์ ํธ ์ค๋ช`

</br>

#### ๐ **[SAFACY APP DEMO ์์ ](https://safacy.s3.ap-northeast-2.amazonaws.com/Demo_safacy.mp4)** ๐

</br>

<img src = "./assets/img/README/private.png" width="100" height="200">
<img src = "./assets/img/README/public setting.png" width="100" height="200">
<img src = "./assets/img/README/public.png" width="100" height="200">
<img src = "./assets/img/README/friend safacy.png" width="100" height="200">
<img src = "./assets/img/README/simulator.gif" width="100" height="200">

- **PRIVATE PAGE**  
  ์์น๊ฐ ๊ณต์ ๋์ง ์๋ ์ํ์๋๋ค.
  Share my Location์ ํ์ฑํ์ํค๋ฉด, Safacy ์ฑ์ ๋ฉ์ธ ๊ธฐ๋ฅ์ธ Public Mode๋ก ์ ํ๋ฉ๋๋ค.

- **SETTING PAGE**  
  Public Mode๊ฐ ํ์ฑํ ๋๋ฉด, ์ด๋ํ๋ ค๋ Destination (ํ์ฌ์์น๋ ๊ฐ๋ฅ), ํ์ฉ ๊ฐ๋ฅํ Radius, ์์ ์๊ฐ Time, ๊ณต์ ํ  Friends ๋ฅผ ์ค์ ํ๊ณ  Start๋ฒํผ์ ๋๋ฅด๋ฉด Public Mode๊ฐ ์์๋ฉ๋๋ค.

- **PUBLIC PAGE**  
  ์ ์ ์ ์์น๊ฐ ๊ณต์ ๋๋ ์ํ์๋๋ค. ์ ์ ์ ์์น ์ํ์ ๋ฐ๋ผ SafacyBotย ์ ์๋์ ๋ณด๋ด๊ฒ ๋๊ณ , SafacyBot ์ฑํ์ฐฝ์ ๋ํ๋ฉ๋๋ค. SafacyBot์ด ์๋์ ๋ณด๋ด๋ฉด ๊ณต์ ๋ฐ์ ์น๊ตฌ๋ push notification์ ๋ฐ๊ฒ ๋ฉ๋๋ค. ์์ธํ SafacyBot์ ๋์ ์๋ฆฌ๋ ์๋ ๋งํฌ๋ฅผ ํ์ธํด์ฃผ์ธ์.  
  [๐ค SAFACYBOT ALGORITHM](https://www.notion.so/d76a615fd2f54532909704de3d30d133)

- **FRIEND SAFACY**  
  ์น๊ตฌ๊ฐ ๊ณต์ ํ ํ์ด์ง์ ๊ฐ์ ์ง๋ & ์ค์ ์ด ๋ณด์ด๋ฉฐ, ์ค์๊ฐ์ผ๋ก ์ด๋ํ๋ ์น๊ตฌ์ ์์น๋ฅผ ํ์ธํ  ์ ์์ต๋๋ค. ๋ง์ผ SafacyBot์ ์๋๋ฉ์์ง์ ๋ฐ๋ฅธ ์ํ์ ๊ฐ์งํ๊ฒ ๋์์ ๋ SOS ๋ฒํผ์ ํตํด, ํ์ฌ ์น๊ตฌ์ ์์น๋ฅผ 119์ ๋ฌธ์๋ก ์ ์กํ์ฌ ๊ตฌ์กฐ์์ฒญ์ ํ  ์ ์์ต๋๋ค.

#

### `๐ท How to use`

**FrontEnd**

> https://gitlab.com/choisy_9619/safacy-frontend

- ํ๋ก์ ํธ root ๋๋ ํ ๋ฆฌ์ .envํ์ผ์ ์์ฑํ ํ, ์๋ ํ์์ ๋ง๊ฒ ํ๊ฒฝ๋ณ์ ๊ฐ ์ค์ 

  ```(javascript)
  BASE_URI={LOCALHOST_URI}
  GOOGLE_IOS_CLIENT_ID={GOOGLE_IOS_CLIENT_ID}
  GOOGLE_MAP_API={GOOGLE_MAP_API}
  MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN}
  ```

**BackEnd**

> https://gitlab.com/choisy_9619/safacy-backend

- ํ๋ก์ ํธ root ๋๋ ํ ๋ฆฌ์ .envํ์ผ์ ์์ฑํ ํ, ์๋ ํ์์ ๋ง๊ฒ ํ๊ฒฝ๋ณ์ ๊ฐ ์ค์ 

  ```(javascript)
  MONGODB_URI={MONGODB_URI}
  ```

#

### `๐ก My Topics`

<h3><U>1. React native - Navigation & Axios ๋น๋๊ธฐ ์ฒ๋ฆฌ</U></h3>

Axios ๋น๋๊ธฐ ์ฒ๋ฆฌ๋ฅผ ์งํํ๊ณ  ๋ฐ๋ก navigation์ผ๋ก ํด๋น screen์ผ๋ก ์ด๋ํ์ ๋, ์์ง pending ์ํ์์ ํ๋ฉด์ด๋์ด ๋ฐ์ํ์ฌ pending๋์์ ์ด์  ๋ฐ์ดํฐ๋ฅผ ๊ฐ๊ณ  ์๋ ํ๋ฉด์ด ๋ ๋๋ง๋๊ณ , fulfilled ๋์์ ๋ ์ํ๋ ์๋ฐ์ดํธ๋ ํ๋ฉด์ด ๋ ๋๋ง ๋๋ ํ์์ด ์ง์๋์์ต๋๋ค. ๋คํธ์ํฌ ํ๊ฒฝ์ด ์ํํ ๊ฒฝ์ฐ ์ด๋ฐ ํ์์ด ์ ์์ง๋ง, ํญ์ ์ข์ ํ๊ฒฝ์์๋ง ๊ตฌ๋๋๋ ๊ฒ์ ์๋๊ธฐ ๋๋ฌธ์ ๋์ฑ์ด ํ์ํ์ต๋๋ค.

- ์ฒซ๋ฒ์งธ ๋ฐฉ๋ฒ > React Native Debugger๋ฅผ ํ์ฉํ์ฌ pending, fulfilled ์ํ ๋ณํ๋ฅผ ํ์ธํ๊ณ , ๊ทธ ๊ฒฝ์ฐ์ ๋ฐ๋ผ state์ ๋ค๋ฅธ status(์ํ)๋ฅผ ๋ถ์ฌํด์ฃผ์์ต๋๋ค. status์ ๋ฐ๋ผ ๋ค์ screen ๋ ๋๋ง์ ๋ถ๊ธฐ์ฒ๋ฆฌ ํด์ฃผ์์ต๋๋ค.

- ๋๋ฒ์งธ ๋ฐฉ๋ฒ > Axios ๋น๋๊ธฐ ์ฒ๋ฆฌ๊ฐ fulfilled ๋์์ ๊ฒฝ์ฐ์๋ง navigation์ด ์ผ์ด๋๋๋ก ํธ๋ค๋งํด์ฃผ์์ต๋๋ค.

React native๋ ๋ฆฌ์กํธ(Web)์ ์ ๊ทผ๋ฐฉ๋ฒ์ ๋ชจ๋ฐ์ผ(App)์ผ๋ก ํ์ฅํ FACEBOOK ์คํ์์ค ํ๋ก์ ํธ์๋๋ค. ๋ฐ๋ผ์ ๊ณตํต์ ๊ณผ ์ฐจ์ด์ ์ด ์กด์ฌํ๊ณ , ๊ฐ์ฅ ํฌ๊ฒ ๋๊ปด์ก๋ ์ฐจ์ด์ ์ screen ์ด๋์ Router๋ฐฉ์์ ์ฌ์ฉํ๋ React์ ๋ฌ๋ฆฌ ๋ฆฌ์กํธ ๋ค์ดํฐ๋ธ๋ Navigation ๋ฐฉ๋ฒ์ ์ฌ์ฉํด์ผ ํ์ต๋๋ค. ์ ๋ Stack Navigation์ ์ฌ์ฉํ๊ณ , stack๊ตฌ์กฐ๋ก screen์ด ์์ฌ๊ฐ๋ฉด์ ์์ํ์ง ๋ชปํ ์๋ฌ๋ฅผ ๋ง๋๊ฒ ๋์์ต๋๋ค. ๊ทธ์ค์์ ํ๋ฉด ์ ํ ์ ๊ธฐ์กด์ ๋ฐ์ดํฐ๊ฐ ๋จ์์๋ ํ์์ ํด๊ฒฐํ๊ธฐ ์ํด, re-rendering ๋ฐฉ๋ฒ์ ์๊ฐํ๊ฒ ๋์๊ณ , ํนํ ๋น๋๊ธฐ ์ฒ๋ฆฌ ํ ์คํฌ๋ฆฐ ์ ํ์ด ๋ง์๋ ์  ํ๋ก์ ํธ์์๋ ์ด์ ๋ํ ๋์ฑ์ด ๊ผญ ํ์ํ์ต๋๋ค. ์ด๋ฅผ ์ํด ์ ๋ ๋น๋๊ธฐ ์ฒ๋ฆฌ๊ฐ ๋ชจ๋ ์๋ฃ๋ ํ screen์ด๋์ ์งํํ๊ณ , ์ด ๋ state ๋ณํ๋ฅผ ํตํด re-rendering์ ์์ผ์ฃผ์ด ๋คํธ์ํฌ ํ๊ฒฝ์ ๊ตฌ์ ๋ฐ์ง ์๋ APP์ ๊ตฌํํ์์ต๋๋ค.

๋ฆฌ์กํธ ๋ค์ดํฐ๋ธ ๊ฐ๋ฐ์ ์์ํ๋ฉฐ ๋ง์ฃผ์น ๊ฐ์ฅ ์ฒซ ๋ฌธ์ ์๊ณ , ๊ผญ ์์์ผ๋๋ ๊ฐ๋์ด๊ธฐ์ ์ด ๋ฌธ์ ๋ฅผ ์ฐจ๊ทผ์ฐจ๊ทผ ํด๊ฒฐํด๋๊ฐ๋ ๊ณผ์ ์ด ๋ฆฌ์กํธ ๋ค์ดํฐ๋ธ์ ๋์ฑ ์ต์ํด์ง ์ ์์์ต๋๋ค.

</br>

<h3><U>2. Location & SafacyBot sharing</U></h3>
์ ์ ์ด๊ธฐ ๊ธฐํ๊ณผ ๊ฐ๋ฐ๋จ๊ณ์์ ์น๊ตฌ์ ๊ณต์ ํ๊ฒ ๋  ๋ถ๋ถ์ธ Map, safacyBot message ๋ฐ์ดํฐ๋ฅผ server์ชฝ์์ ๋ค๋ฃจ์ง ์๊ณ , state๋ก ๊ด๋ฆฌํ๋ฉด์ ๋ก๊ทธ์ธํ ์ ์ ์ ๋ฐ๋ผ ๋ถ๊ธฐ์ฒ๋ฆฌํ์ฌ ๋ณด์ฌ์ฃผ๋ คํ์ต๋๋ค. ํ์ง๋ง ์ด ๋ฐฉ๋ฒ์ ์ฝ๋๋ฅผ ๊ต์ฅํ ๋ณต์กํ๊ฒ ๋ง๋ค์๊ณ , ํนํ ์์น ์ ๋ณด์ ํผ์ ์ด ์๊ฒจ ์์ฒญ๋ ์๋ฌ๊ฐ ๋ฐ์ํ์ต๋๋ค. ์ด๋ฅผ ์ํด์ ์ ๋ ์ง์ ๋ ์ ๋ณด (Safacy setting์ ๊ฒฐ์ ํ๋ destination, radius, time ๋ฑ)๋ ๋ฐ๋ก server์ ์ ์ฅํ๊ณ , ์ค์๊ฐ์ผ๋ก ๋ณํํ๋ ๋ถ๋ถ(user์ ์ด๋, ์ด๋์ ๋ฐ๋ฅธ safacyBot์ ๋ฉ์์ง)์ Socket.io ํต์ ์ผ๋ก ๊ตฌํํ์์ต๋๋ค. ๊ธฐํ๋จ๊ณ์์ ๋ฏธ์ฒ ์๊ฐํ์ง ๋ชปํ ๋ถ๋ถ์ด์ด์ ๊ฐ๋ฐ ์ค๊ฐ์ ์๋ฒ๊ตฌ์กฐ๋ฅผ ๋ํญ ๋ณ๊ฒฝํ๋ ์๊ฐ์ด ํ์ํ์ง๋ง, ๋ฐ์ดํฐ๋ฅผ ์ฒ๋ฆฌํ๋ ๋ฐฉ๋ฒ์ ๋ํด ๋ฐฐ์ธ ์ ์๋ ๊ณ๊ธฐ๊ฐ ๋์์ต๋๋ค.

</br>

<h3><U>3. Redux-thunk</U></h3>
์ด์  ํํ๋ก์ ํธ์์ ์ฌ์ฉํ React Query์ ๋ฌ๋ฆฌ ์ ๋ ์ด๋ฒ์ Redux-toolkit์ createAsyncThunk๋ฅผ ํ์ฉํ์ฌ ๋น๋๊ธฐ๋ฅผ ์ฒ๋ฆฌํ์ต๋๋ค.

- Redux-thunk๋ฅผ ์ ์ ํ ์ด์ : ์ ํด๋ณด์ง ๋ชปํ redux thunk๋ฅผ ์ฌ์ฉํด๋ณด๊ณ  ์ถ์๊ณ , Redux toolkit ๋ด๋ถ์ ์ผ๋ก thunk ๊ธฐ๋ฅ์ ๊ฐ๊ณ  ์์ผ๋ฉฐ createAsncThunk๋ก ์ปดํฌ๋ํธ ์ธ๋ถ์์ ๋น๋๊ธฐ์ฒ๋ฆฌ๋ฅผ ํ์ฌ ๊ด์ฌ์ฌ ๋ถ๋ฆฌ์ ์ฉ์ดํ๋ค๋ ๊ณต์๋ฌธ์์ ๋ด์ฉ์ ๋ณด์๊ธฐ ๋๋ฌธ์ด์์ต๋๋ค. ์ฌ์ฉํ๋ฉด์ react query์ ๋ฌ๋ฆฌ ๊ฐ๋จํ๊ฒ ๊ด์ฌ์ฌ๋ฅผ ๋ถ๋ฆฌํ  ์ ์์๊ณ , ๋น๋๊ธฐ ์ฒ๋ฆฌ์ ๋ํ status ๋ํ ํ์คํ ๋ถ๋ฆฌํ  ์ ์์ด์ debugging์ ํธ๋ฆฌํจ์ ๋๋ ์ ์์์ต๋๋ค. ๊ทธ๋ฆฌ๊ณ  ๊ฒฐ๊ณผ์ ์ผ๋ก ๊ฐ๋ฐ ์๋๊ฐ ํฅ์๋์์ต๋๋ค.

React query๋ redux-thunk์ ๋ค๋ฅธ ์๋ฏธ๋ก ๊ด์ฌ์ฌ๋ฅผ ๋ถ๋ฆฌํ๋ ๋ฉ์๋๋ผ๊ณ  ์๊ฐํฉ๋๋ค. ์์ธํ๋ณด๋ฉด redux ์์ฒด๋ global state๋ผ๋ ๊ณตํต๋ ์ ์ฅ์๋ฅผ ๋ง๋ค์ด ๋ชจ๋  ์ปดํฌ๋ํธ๋ค์ด ๋ฐ์ดํฐ๋ฅผ ์ ๊ทผ ์ฌ์ฉํ  ์ ์๋ ๊ธฐ๋ฅ์ ๊ฐ๊ณ  ์๋๋ฐ, redux์๊ฒ ๋น๋๊ธฐ์ฒ๋ฆฌ ์๋ฌด๊น์ง ๋งก๊ธด๋ค๋ ๊ฑด ๊ด์ฌ์ฌ๊ฐ ํ์คํ ๋ถ๋ฆฌ๋์ง ์๋๋ค๊ณ  ๋ณผ ์ ์์ต๋๋ค. ๋ฐ๋ผ์ ๋น๋๊ธฐ ์ฒ๋ฆฌ๋ฅผ react์ useQuery๋ฅผ ์ฌ์ฉํ์ฌ ๊ตฌํํ๋ ๊ฒ์ด ์ข๊ฒ ๋ณด์ฌ์ง ์ ์์ ๊ฒ์ด๋ผ ์๊ฐํ์ต๋๋ค. ํ์ง๋ง ์ง์  redux-thunk๋ฅผ ๋ค๋ค๋ณธ ํ, ์ฝ๊ธฐ ์ข์ ์ฝ๋๊ฐ ์ข์ ์ฝ๋๋ผ๊ณ  ์๊ฐํ๋ ์ ์ ๊ด์ ์์ Redux-thunk๋ฅผ ์ฌ์ฉํ์์ ๋ ๊ฐ๋์ฑ๊ณผ ๋ฐ์ดํฐ์ฒ๋ฆฌ๊ฐ ์์ํ๊ฒ ๋๊ปด์ง๊ธฐ๋ ํ๋ค. ํนํ ๋น๋๊ธฐ์์ฒญ์ ์ทจ์ํ๋ ๋ฑ์ ์ถ๊ฐ์ ์ธ ๊ธฐ๋ฅ์ด ๊ฐ๋ฅํ ์ ์์ ๋ง์กฑ๋๊ฐ ๋์์ต๋๋ค.

Redux-thunk & React-query ์๋ก ์ฅ๋จ์ ์ด ์๊ธฐ ๋๋ฌธ์ ์ํฉ์ ๋ง๊ฒ ์ฌ์ฉํ๋ ๊ฒ์ด Best๊ฐ ๋  ๊ฒ์ด๋ผ ์๊ฐํ๊ฒ ๋์์ต๋๋ค.

#

### `๐ ํ๋ก์ ํธ๋ฅผ ๋ง์น ์๊ฐ`

**๊ธฐํ๋จ๊ณ - ์ค๋  ๊ฐ๋, ๋ถ์๊ฐ๋ ํจ๊ป**

์ด์ ๋ถํฐ ์ฑ App์ ๊ฐ๋ฐํด๋ณด๊ณ  ์ถ์๊ธฐ์ ๊ธฐํ (์์ด๋์ด, ์นธ๋ฐ, ๋ชฉ์, ์คํค๋ง)ํ๋ ์๊ฐ์๊ฐ์ด ์ค๋ ์ผ๋ก ๊ฐ๋ํ์ต๋๋ค. ์ฌ๋ฌ ์์ด๋์ด๋ค์ด ์์๋ฏ์ด ๋ ์ฌ๋๊ณ , ๊ตฌํ๋ ์ ์ App์ ์์ํ๋ฉฐ ๊ณต๋ถํ๋ ์๊ฐ์ด ์ฆ๊ฒ๊ฒ ๋๊ปด์ก์ต๋๋ค. ํ์ง๋ง ํ๋ก์๊ธฐ์ ์์! โ๋ด๊ฐ ๊ตฌํํ  ์ ์์๊น? ํผ์ ํ  ์ ์์๊น?โ ๋ผ๋ ์๊ฐ๊ณผ ํจ๊ป ๋ถ์๊ฐ์ด ๊ณต์กดํ๋ ์๊ฐ์ด์์ต๋๋ค. ์์๋ง ํด์ค๋ ๊ธฐ๋ฅ๋ค์ ๊ตฌํํ  ์ ์์์ง, web๊ณผ ๋ค๋ฅธ ์ ์์ ์ค๋ ๋ฌ๋์ปค๋ธ๊ฐ ๋์ง ์์์ง ๋ฑ๋ฑ ์ด๋ฐ ์๊ฐ๊ณผ ํจ๊ป ๊ฐ๋ฐ๋จ๊ณ๋ฅผ ์์ํ๊ฒ ๋์์ต๋๋ค.

**๊ฐ๋ฐ๋จ๊ณ - ํ๋ํ์ง๋ง, ๋ฒฝ์ ๋ถ์๋ ๋ง์กฑ๊ฐ, ๊ทธ๋๋ ํด๋ณด์!**

์ญ์๋ ๊ธฐํ๋จ๊ณ๋ถํฐ ์์ํ๋ ๋ง์ ๋๊ด์ด ์์์ต๋๋ค. ํผ์์ ํด๊ฒฐํด์ผ ํ๋ค๋ ์ฑ์๊ฐ๊ณผ ํจ๊ป ๊ตฌํํ์ง ๋ชปํ์ ๋์ ๊ฑฑ์ ์ด ๋ฐ๋ณต๋์์ต๋๋ค. ์ด๋ ค์์ ๊ฒช์ ๋๋ง๋ค ์ผ๋, ๋ฉํ ๋๋ค, ํํ๋ก์ ํธ ํ์๋ค์ด ๋ง์ ํ์ ์ฃผ์๋ ๊ฒ์ด ์๊ฐ๋ฌ๊ณ , ๋ง์์ด ์ฝํด์ง๋ ์๊ธฐ๊ฐ ์์์ต๋๋ค. ํ์ง๋ง โ๊ทธ๋๋ ํด๋ณด์!"๋ผ๋ ์๊ฐ์ผ๋ก ์ฐจ๊ทผ์ฐจ๊ทผ ํด๋๊ฐ์ต๋๋ค. ๊ทธ๋ฆฌ๊ณ  Task๋ผ๋ ๋ฒฝ์ ๊นจ๋ถ์๋ค๋ ๋๋์ด ๋ค์ด์ ๋ง์กฑ๊ฐ๋ ํฌ๊ฒ ๋๊ปด์ก์ต๋๋ค. ํ๋จ๊ณ ๋๊ฐ๋๋ง๋ค ํฐ ๋ฒฝ์ด ์์์ง๋ง, ๊ทธ๋์ ๋ฐ๋๋ผ์ฝ๋ฉ์ ๋ถํธ์บ ํ ๊ธฐ๊ฐ๋์ ๋ฐฐ์ ๋ ์ง์, ๋ฌธ์  ํด๊ฒฐ ๋ฅ๋ ฅ์ ํ์ฉํ๋ ์๊ฐ์ด์๋ค๊ณ  ์๊ฐํฉ๋๋ค.

**์์ฑ๋๋ฅผ ํฅํด**

์ด๋ฒ ํ๋ก์ ํธ์์ ์ ์ ๋ชฉํ๋ **์์ฑ๋** ์์ต๋๋ค. ์ด๋ฅผ ์ํด ๊ธฐํ์ ๋ง์ ๋ธ๋ ฅ์ ๋ค์์ต๋๋ค. ํ์ง๋ง ์๊ฐํ์ง ๋ชปํ ๋ค์ํ ๊ธฐ์ ์ , ๊ธฐํ์  ๋ณ์๋ค์ด ์กด์ฌํ๊ณ , ์ ์ ๋ค์ ์์ฅ์์ ๋ถํธํจ์ ๋๋ ์ ์๋ ์ฌ๋ฌ ์๋ฌ๋ค์ด ๋ฐ์ํ์ต๋๋ค. ๊ทธ๋ ๊ฒ Schema ๊ตฌ์กฐ๊ฐ ์ฒ์ ๊ธฐํ์์ ๋ฌ๋ผ์ง๊ณ , ๋ฐฑ์๋๋ฅผ ์ ๋ฐ์ ์ผ๋ก ์์ ํด์ผํ๋ ์ผ์ด ๋ฐ์ํ์ต๋๋ค. ์์ํ์ง ๋ชปํ ๊ธฐํ๋ณ๊ฒฝ์ผ๋ก ์์๋ ์๊ฐ์ด ๋ง์๊ณ , ์ธ๋ฐํ ์๋ฌ ํธ๋ค๋ง์ด ๋์ง ์์ ์ ์ ์์ฌ์์ด ๋จ์ต๋๋ค. ํ์ง๋ง ์ด๋ฐ ๊ฒฝํ์ด ๋ค์ ํ๋ก์ ํธ ๊ธฐํ๋จ๊ณ์์ ๋ฏธ๋ฆฌ ๊ณ ๋ คํ  ํญ๋ชฉ์ด ๋  ๊ฒ์ด๋ผ ์๊ฐํฉ๋๋ค.

๋ฐ๋๋ผ์ฝ๋ฉ ๋ถํธ์บ ํ ์๊ฐ๋์ ์ ๋ง ๋ง์ ๋ถ๋ค๊ป ๋์์ ๋ฐ์์ต๋๋ค.  
์ด ๋์์ ๋ฐํ์ผ๋ก ์๋ก์ด ํ๊ฒฝ์์ ์๋ก์ด ํ๋ก์ ํธ๋ฅผ ์งํํ  ๋ ํ๋ฃจํ๋ฃจ ๋ฐ์ ํ๋ ๊ฐ๋ฐ์๊ฐ ๋๊ฒ ์ต๋๋ค.
