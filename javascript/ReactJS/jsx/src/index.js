/* 
  1. React 와 ReactDOM 라이브러리 inport 
  ES6에서 지원하는 방식의 module import를 쓴다.

  기존의 require 는 commonJS의 방식으로 treeshaking이 된다.
*/
import React from 'react'; 
import ReactDOM from 'react-dom';

/* 
  2. React 컴퍼넌트를 생성 ( JSX 라는 HTML을 다루는 JS의 다른 문법 )
    - HTML을 생성해서 사용자에게 보여주며
    - 이벤트핸들링 진행한다.

    - 함수로 생성할 수 있고
    - class로 생성할 수 있다.

    - HTML 영역에서는 ""
    - JS 영역에서는 ''
*/
function getTime() {
  return ;
}

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



/* 
  3. 화면에서 HTML 띄우고 이벤트 핸들링
    - DOM : 화면이라고 생각하면 됨
*/
ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
