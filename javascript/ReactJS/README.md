# REACT

## 1. Install

- `$ npx create-react-app jsx` 으로 react 프로젝트를 `jsx`이름으로 만들어주자

  > global option 으로 `create-react-app` 을 깐 다음에 언제나 사용할 수 있지만 `npx` 명령어로 1회용으로 깔아서 사용할 수 있기 때문에 package를 굳이 깔지 않아도 된다.

- **jsx** 폴더로 들어간 뒤 `npm start` 로 실행을 시키면 아래의 화면과 같이 나온다.

  ![](https://images.velog.io/post-images/velopert/621f9250-c636-11e8-bc23-b911dbba0b89/-2018-10-02-8.27.17.png)

  > 화면결과 : 
  >
  > $ npm start
  >
  > > jsx@0.1.0 start C:\Users\kimsj\Git\TIL\Javascript\ReactJS\jsx
  > > react-scripts start
  > > Starting the development server...
  > > Compiled successfully!
  >
  > You can now view jsx in the browser.
  >
  >   Local:            http://localhost:3000/
  >   On Your Network:  http://192.168.56.1:3000/
  >
  > Note that the development build is not optimized.
  > To create a production build, use npm run build.

## 2. Getting Started

### 2.1 Import

- React에서는 ES6에서 지원하는 방식의 module import 를 쓴다.

  > Dynamic loading이 지원되며 module들이 동기 형식으로 순차적으로 불러와지게 된다.
  >
  > BabelJS Complier가 없으면 지원되지 않는 대표적 문법이기도 하다.

- 기존의 `require` 는 commonJS의 방식으로 treeshaking이 된다.

  >  TreeShaking이란?  나무를 흔들어 필요없는 요소를 떨어뜨리고 필요한 것만 가져오는 행위

  ```js
  import React from 'react'; 
  import ReactDOM from 'react-dom';
  ```

### 2.2 Component

- React 는 Component 들의 모음으로 이루어져 있다고 생각해도 된다.

- Component 는 **HTML을 생성**하고, **이벤트 핸들링**을 진행한다. 

- Component 는 **함수**와 **클래스**로 생성할 수 있다.

  ```js
  function getTime() {
    return (new Date()).toLocaleTimeString();
  }
  
  const App = () => {
    const buttonText = 'Click';
    return (
    <div>
      <h3>{ getTime() }</h3>
      <label htmlFor="name" className="name_label">Enter name: </label>
      <input type="text" id="name" />
      <button style={{ backgroundColor: 'blue', color: 'white', border: 'solid 1px black' }}>
        { buttonText }
      </button>
    </div>
    )
  }
  ```

### 2.3 DOM

- 이제 Component를 render해보자

  ```js
  ReactDOM.render(
    <App />,
    document.querySelector('#root')
  )
  ```


## 3. Components

- 만든 Component 는 src 내부에 따로 js파일로 저장한다**.**

  **CommentDetail.js**

  ```js
  import React from 'react'
  
  // Comment Component를 만들어보자.
  export default props => {
    return (
      <div className="comment">
        <a href="#" className="avatar">
          <img src={ props.img } alt="avatar" />
        </a>
  
        <div className="content">
          <a href="#" className="author">
            { props.author }
          </a>
          <div className="metadata">
            <span className="date">{ props.date }</span>
          </div>
          <div className="text">{ props.text }</div>
        </div>
      </div>
    )
  }
  ```

  > props는 상위 Component를 통해서 받은 변수들을 담고있는 객체이다.

- 최상위 Component에서 만든 Component를 불러보자.

- 가짜 정보들은 fakerJS 모듈을 사용해보자 `$ npm i faker`

  ```js
  import React from "react";
  import ReactDOM from "react-dom";
  import CommentDetail from "./CommentDetail";
  import faker from 'faker';
  
  // 최상위 component
  const App = () => {
    return (
      <div className="ui container comments">
        <CommentDetail 
          author={ faker.name.firstName() }
          img={ faker.image.avatar() }
          date={ faker.date.recent().toLocaleString() }
          text={ faker.lorem.sentence() }
        />
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.querySelector("#root"));
  ```


