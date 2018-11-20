import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

class App extends React.Component {
  constructor(props) {
    super(props); // 상속받은 객체는 필수적
    this.state = {
      // state의 초기화
      lat: null,
      errorMessage: ""
    };

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
    // 사용자 거부 시
    if (this.state.errorMessage && !this.state.lat) {
      return (<div><p>Error: {this.state.errorMessage}</p></div>);
    }

    // 사용자 허용 시
    if (!this.state.errorMessage && this.state.lat) {
      return (<div><p>위도(latitude): {this.state.lat}</p></div>);
    }

    // 사용자의 허용/거부 기다리는 중..
    return (<div><p>Loading</p></div>);
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
