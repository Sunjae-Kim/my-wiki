import React from 'react';
import ReactDOM from 'react-dom';

// 최상위 component
const App = () => {
  return (
    <div>
      쉬었다 와요.
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);