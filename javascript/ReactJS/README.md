# REACT Basic

[TOC]

## 1. Getting Started

### 1.1 Installation


- `$ npx create-react-app <app name>` 으로 react 프로젝트를 `jsx`이름으로 만들어주자

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

### 1.2 Import

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

---

## 2. JSX

- JSX 는 HTML을 손쉽게 만들어 주기 위한 언어로 JS이지만 브라우저에서는 직접 지원되지 않는다.

- JSX 는 BABEL Complier를 통해서 자동 compling 이 되어 HTML처럼 작성하면 알아서 `createElement()` 함수를 사용하여 HTML을 만들어 준다.

  ```js
  const App = () => {
    const buttonText = 'Click';
    return (
    <div>
      <h3>{ new Date().toLocaleTimeString() }</h3>
      <label htmlFor="name" className="name_label">Enter name: </label>
      <input type="text" id="name" />
      <button style={{ backgroundColor: 'blue', color: 'white', border: 'solid 1px black' }}>
        { buttonText }
      </button>
    </div>
    )
  }
  ```

  > 딱봐도 처음보는기괴한 이상한 문법이다. 아래에서 자세하게 알아보도록 하자.

### 2.1 JSX 문법

- Styling을 할 땐 `-` 기호는 지우고 CamelCase로 작성하도록 하자.
- class이름은 `className` 을 통해서 준다. ( 비슷하게 HTML의 `for` 를 `htmlFor` 라고 정의한다. )
- JS변수를 `{ }` 내부에서 사용할 수 있다.
- 구분을 위해 JS에서는 `''` 를 사용하고, HTML내에서는 `""` 를 사용하자.

---

## 3. Component

### 3.1 Basic

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

### 3.2 Creating Components 

- 만든 Component 는 src 내부에 따로 js파일로 저장하고 재사용 한다.

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

- 위와 같이 React 앱은 Component 들로 이루어져 있으며 몇가지 Component 의 다른 예시를 확인해보자.
  - 파일 전체보기 : <https://github.com/Sunjae-Kim/TIL/tree/master/javascript/ReactJS/components/src>

---

## 4. Making Season-Checker Application

- **App을 구성해보자 (Overview) **
  - 브라우저 JS 파일 불러옴
  - `<APP />` 컴포넌트 생성
  - Geolocation API 가 위치정보 받기 시작
  - React  App 이 JSX 반환하며 HTML 렌더링
  - API의 비동기 작업을 기다림
  - 사용자 위치정보 GET
  - state 객체를 `this.setState()` 로 update
  - React 가 Component 의 update를 알아차림
  - React 가 해당 Component의 `render()` 를 실행
  - `render()` 가 바뀐 `state`를 담은 JSX 반환
  - React가 바뀐 JSX 렌더링

### 4.1 Geolocation API로 사용자 위치 가져오기

- Browser console에서 `window.navigator.geolocation.getCurrentPosition()` 함수로 사용자 기준으로  현재 위치를 확인할 수 있다.

- **index.js** 의 App 안에서 Callback 함수로 실행해보자.

  ```js
    window.navigator.geolocation.getCurrentPosition( 
      position => console.log(position),
      error => console.log(error)
    );
  ```

- 앱을 시작을 하면 다음과 같은 알림이 나오게 된다.

  ![위치정보확인](https://www.clockspot.com/support/wp-content/uploads/2016/01/screen19.png)

  > Allow 결과 :
  >
  > ```js
  > > Position {coords: Coordinates, timestamp: 1542677899743}
  > 	> coords: Coordinates
  >     	> ...
  >         > latitude: 37.5108295
  >         > ...
  > ```

### 4.2 Class Component and State

- class component에서만 사용이 가능하다.
  - class 라는 객체이기 때문에 state 말그대로 상태를 정의하는게 가능하다.

- state에 조금이라도 변화가 있으면 자동으로 다시 rendering이 일어난다.
- component 가 만들어진 뒤에 state 는 초기화가 일어난다.
- set-state를 통해서만 state의 update가 가능하다.

#### Class Component

```js
class App extends React.Component {
  constructor(props) {
    super(props); 		// 상속받은 객체는 필수적
    this.state = {		// state의 초기화
      
      lat: null,
      errorMessage: ""
    };
    
    // 시작할 때 최초 1회만 실행이 되며 render시 매번 실행되지 않음
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
      },
      error => {
        this.setState({ errorMessage: error.message });
      }
    );
  }

  render() {
    
    return (
      <Fragment>
        <div>
          <p>위도(latitude): {this.state.lat}</p>
          <p>Error: { this.state.errorMessage }</p>
        </div>
      </Fragment>
    );
  }
}
```

#### State에 따른 분기

| Lat  | Error |   Response    |
| :--: | :---: | :-----------: |
|  O   |   X   | Show Latitude |
|  X   |   O   |  Show Error   |
|  X   |   X   |   Loading..   |

```js
// 사용자 거부 시
if (this.state.errorMessage && !this.state.lat) {
    return (<div><p>Error: {this.state.errorMessage}</p></div>);
}

// 사용자 허용 시
if (!this.state.errorMessage && this.state.lat) {
    return (<div><p>위도(latitude): {this.state.lat}</p></div>);
}

// 사용자의 허용/거부 기다리는 중..
return (<div><p>Loading...</p></div>);
```

























