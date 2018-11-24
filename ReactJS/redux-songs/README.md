# Redux
- [1. Getting Started](#1-getting-started)
  - [1.1 개요](#11-%EA%B0%9C%EC%9A%94)
  - [1.2 예시](#12-%EC%98%88%EC%8B%9C)
- [2. Practice](#2-practice)
  - [2.1 Setting](#21-setting)
  - [2.2 Action](#22-action)
  - [2.3 Reducer](#23-reducer)
  - [2.4 Songlist.js](#24-songlistjs)
  - [2.5 Songdetail.js](#25-songdetailjs)

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

- 위의 **songsReducer** 를 통해서 모든 데이터를 불러온 뒤 listing 하는 component를 만들어 보자.

  ```js
  import React, { Component } from 'react'
  import { connect } from 'react-redux'
  import { selectSong } from '../actions'
  
  class Songlist extends Component {
    render() {
      return (
        <div className="ui divided list">
          { this.renderList() }
        </div>
      )
    }
  
    renderList(){
      console.log(this.props);
      return this.props.songs.map(song => {
        return(
          <div key={ song.title } className="item">
            <div className="content">
              { song.title }
            </div>
            <div className="right float content">
              <button 
                className="ui button primary"
                onClick={ () => this.props.selectSong(song) }
              >
                Play
              </button>
            </div>
          </div>
        )
      })
    }
  }
  
  // 함수이름 convention
  const mapStateToProps = state => {
    // state의 변화가 일어날 시 반드시 수행이 된다.
    console.log(state);
    return {
      songs : state.songs
    }
  }
  
  export default connect(
    mapStateToProps,
    { selectSong }
    )(Songlist);
  ```

  - **`render()`** : 렌더링 하는 함수의 return 부분은 정말 깔끔하게 코딩을 하는게 좋다. 그래서 `renderList()` 함수를 만들어서 긴 markup을 생성한 뒤 `render()` 내부에서 반환하도록 디자인을 한다.
  - **`mapStateToProps()`** : 함수이름이 직관적으로 기능을 설명한다. store에 있는 state 값을 `combineReducers()` 를 통해 저장을 하고 있는 상황이다. 해당 함수로 state에 저장된 값을 현재 component의 `props` 에 저장을 하겠다는 뜻이다. `songs` 가 필요하므로 `songs` 만 불러와서 props에 담아두도록 하자.
  - **`connect()()`** : 첫번째 함수의 첫번째 매개변수로 위에 선언한 `mapStateToProps()` 를 넣는다. 두번째 매개변수로는 현재 component에서 수행할 action을 object 내부에 적는다. 두번째 함수의 매개변수로는 현재 component 객체를 적도록 하자. 그럼 redux를 통해서 정보를 주고받을 준비가 완료되었다.
  - **`rederList()`** : `props` 객체에 저장이 된 songs를 iterator를 통해서 조회하며 각 원소별 정보를 통해 row를 만들어 listing하도록 한다. store에 저장되는 모든 정보들은 각각이 유니크한 **key** 값이 필요하기 때문에 1개의 정보의 최상단 markup에 **key option** 을 줘야한다.
  - **`selectSong()`** : `renderList()` 내부에 `onClick` 이벤트에 선언을 했으며 song을 매개변수로 넘겨줘서 해당 row에서 play 버튼을 누르면 그 song이 store에 저장이 되도록 구현이 되었다.

---

### 2.5 Songdetail.js

- `Songlist.js` 에서 만든 리스트에서 Play 버튼을 클릭했을 때 선택된 노래의 정보를 출력해보자.

  ```js
  import React from 'react'
  import { connect } from 'react-redux'
  
  const Songdetail = ({song}) => {
    return (
      <div>
        <h1>Details</h1>
        { renderSongDetail(song) }
      </div>
    )
  }
  
  const renderSongDetail = song => {
    if(!song){
      return (<div>select a song!</div>)
    } else {
      return Object.keys(song).map( key => {
        return (
          <p key={key} > { key } : { song[key] } </p>
        )
      })
    }
  }
  
  const mapStateToProps = state => {
    return {
      song : state.selectedSong
    }
  }
  
  export default connect(mapStateToProps)(Songdetail);
  ```

  - Click event가 발생하여 store에 있는 `selectedSong` 이 바뀌게 되면 state가 바뀌는 개념으로 실시간으로 rendering이 다시 발생한다. 그러므로 `Songdetail.js` 의 내용은 click event가 발생 될때마다 실시간으로 변하게 된다.



















