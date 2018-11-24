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
      type: 'SONG_SELECTED',
      payload: song,
    }; 
  }
  ```

  > `export <function>` : 해당 export 방식은 **named export** 방식으로 다른 곳에서 
  >
  > `import { <function> } from '</directory>';` 형식의 호출이 가능하다.























