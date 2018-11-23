
import React from 'react';
import ReactDOM from 'react-dom';

// 패키지 및 모듈
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// 내가 작성한 코드
import App from './components/App';
import reducers from './reducers'; // folder의 index.js 에서 찾는다.

ReactDOM.render(
  <Provider store={ createStore(reducers) }>
    <App />
  </Provider>, 
  document.querySelector('#root')
)
