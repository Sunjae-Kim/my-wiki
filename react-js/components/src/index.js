import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";
import Message from "./Message";
import Segment from "./Segment";

// 최상위 component
const App = () => {
  return (
    <Fragment>
      <Segment>
        <div className="ui icon header">
          <i className="pdf file outline icon">No Document</i>
        </div>
        <div className="ui primary button">Add Document</div>
      </Segment>
      <Segment>
        <h4 className="ui header">For Your Information</h4>
        <p>{faker.lorem.paragraph()}</p>
      </Segment>

      <Message header={faker.lorem.word()} paragraph={faker.lorem.sentence()} />
      <div className="ui container comments">
        <ApprovalCard>
          <CommentDetail
            author={faker.name.firstName()}
            img={faker.image.avatar()}
            date={faker.date.recent().toLocaleString()}
            text={faker.lorem.sentence()}
          />
        </ApprovalCard>

        <ApprovalCard>
          <CommentDetail
            author={faker.name.firstName()}
            img={faker.image.avatar()}
            date={faker.date.recent().toLocaleString()}
            text={faker.lorem.sentence()}
          />
        </ApprovalCard>
      </div>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
