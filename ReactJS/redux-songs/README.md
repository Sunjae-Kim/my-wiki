# Redux

[TOC]

## 1. Getting Started

### 1.1 개요

- **WHAT?** 소프트웨어 아키텍처,  ReactJS에서 `state` 를 관리하기 위한 거대한 이벤트 루프
- **WHY?** 일반 ReactJS로만 만드는 App에 비해선 비교적 복잡도가 있는 편이다. 하지만 App 의 규모가 커질수록 Redux를 사용하지 않는다면 그 App의 복잡도는 훨씬 커질것이다.
- **Three Rules**
  1. 1개의 App 안에 **1개의 Store** (여러개가 존재할 수 없다.)
  2. **읽기전용** (write를 하면 안되고 복사 후 수정을 한다.)
  3. **순수함수**

### 1.2 예시

| Action Creator | Action | Dispatch  | Reducer | State         | React  |
| -------------- | ------ | --------- | ------- | ------------- | ------ |
| 고객           | 요청   | 창구 직원 | 부서    | 데이터 저장소 | 매니저 |

- 고객이 요청을 가지고 창구직원에게 전달한다.
- 창구직원은 모든 요청과 데이터 저장소에의 데이터를 각 부서에 전달한다.
- 각 부서는 해당 요청을 검토한 뒤 부서에 맞는 필요 작업이 있으면 작업을 수행한다.
- 데이터를 다시 데이터 저장소에 저장한다.
- 자세한 예시 코드 [Link](https://github.com/Sunjae-Kim/TIL/tree/master/javascript/ReactJS/redux/src/example.js)

- 실제 코드에서는 react-redux의 `<Provider />` 가  redux의 `store` 의 모든 데이터를 받은 뒤 react-redex의 `<Connect />` 를 통해서 각 react component들에게 데이터를 전달하게 된다.

  덕분에 가장 안쪽에 있는 component도 부모 의 부모 component를 통해 데이터를 전달 받지 않아도 되며 `<Connect />` 를 통해서 바로 전달 받을 수 있게 된다.

## 2. Practice

### 2.1 Setting

- **Installation**

  ```bash
  $ npm install redux react-redux
  ```

  > 2개의 module을 설치하자. 

- index.html에 **semantic-ui  CDN**을 붙여서 깔끔한 UI를 만들어보자.

  ```html 
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
  ```

- src 안에 actions, components, reducers 디렉토리를 생성하자.

- **src/index.js** 에서 redux setting을 하게 된다.

  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  // 패키지 및 모듈
  import { Provider } from 'react-redux';
  import { createStore } from 'redux';
  
  // 내가 작성한 코드
  import App from './components/App';
  import reducers from './reducers'; // folder의 index.js 에서 찾는다.
  
  /* 
    Rendering 과정
    redux에게 받아오는 모든 데이터를 store라고 정의를 하고
    모든 component에게 props를 통해 접근 가능하도록 정의한다.
  */
  ReactDOM.render(
    <Provider store={ createStore(reducers) }>
      <App />
    </Provider>, 
    document.querySelector('#root')
  )
  ```

---

### 2.2 Action

- 어떤일을 할 것인가를 발행하여 store에 내용을 저장할 함수를 만들어보자.

- Action Creator가 Action을 반환하는 코드를 만들어 볼 것이다.

  ```js
  export const selectSong = song => {
    return {
      type: 'SONG_SELECTED', // 전체 대문자에 '_' 구분은 convention이다.
      payload: song, // 선택된 Song을 저장하는 공간에 song을 저장하도록 한다.
    }; 
  }
  ```

  > `export <function>` : 해당 export 방식은 **named export** 방식으로 다른 곳에서 
  >
  > `import { <function> } from '</directory>';` 형식의 호출이 가능하다.

---

### 2.3 Reducer

- **songsReducer**

  Database를 연동하지 않았음으로 Database에서 음악을 전체 불러오는 듯한 느낌을 주는 reducer 1개를 생성한다.

  ```js
  import { combineReducers } from 'redux';
  
  // 가지고 있는 모든 song 모두를 그대로 전달만 하는 reducer
  const songsReducer = () => {
    return [
      { title: 'lo-fi', artist: 'under', duration: '2:12' },
      { title: 'hiphop', artist: 'rapper', duration: '3:30' },
      { title: 'beat', artist: 'loptimist', duration: '4:12' },
    ];
  };
  ```

  > 전체 곡을 가지고 있는 reducer이며 전체를 전달하는 업무만 한다.

- **selectedSongReducer**

  위에 불러온 list에서 1개의 song을 선택하고 선택된 song을 store의 "1개의 선택된 song을 담는 공간" 에 저장을 하는 reducer를 생성하자.

  ```js
  // 1개의 노래만 저장하고 전달하는 reducer
  const selectedSongReducer = (selectedSong=null, action) => {
    if(action.type === 'SONG_SELECTED') { // action에서 정의한 type에 일치하는지 확인한다.
      return action.payload	// 맞으면 담아온 song을 저장한다.
    } else {
      return selectedSong;
    } 
  };
  ```

- **combineReducers**

  모든 reducer를 매개변수로 받아서 **store**라는 저장고를 생성하여 모든 component에게 `<Connect />`로 접근을 가능하게 `export` 해준다.

  ```js
  export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
  });
  ```

---

### 2.4 Songlist.js

- 

### 2.5 Songdetail.js

- 



















