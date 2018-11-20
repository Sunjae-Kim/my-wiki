import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

// const App = () => {

//   window.navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     error => console.log(error)
//   );

//   return(
//     <Fragment>
//       <div>
//         <SeasonDisplay />
//       </div>
//     </Fragment>
//   );
// };

class App extends React.Component {
  render() {
    window.navigator.geolocation.getCurrentPosition(
      position => console.log(position),
      error => console.log(error)
    );
    return (
      <Fragment>
        <div>
          <SeasonDisplay />
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
