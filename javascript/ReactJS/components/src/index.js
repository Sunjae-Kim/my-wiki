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
      {/* <CommentDetail />
      <CommentDetail /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));