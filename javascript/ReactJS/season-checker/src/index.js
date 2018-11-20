import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import Error from "./Error";

class App extends React.Component {
  
  state = {
    // state의 초기화
    lat: null,
    errorMessage: ""
  };

  renderContent(){
    // 사용자 거부 시
    if (this.state.errorMessage && !this.state.lat) {
      return (<Error message={'위치 권한 허용이 차단되었습니다.'} />);
    }

    // 사용자 허용 시
    if (!this.state.errorMessage && this.state.lat) {
      return (<SeasonDisplay lat={this.state.lat} />);
    }

    // 사용자의 허용/거부 기다리는 중..
    return (<Spinner message={'위치 권한 허용을 기다리는 중입니다.'} />);
  }

  render() {
    return(
      <div>
        { this.renderContent() }
      </div>
    )
  }


  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
      },
      error => {
        this.setState({ errorMessage: error.message });
      }
    );
  }
  
  componentDidUpdate(){
    console.log('component UPDATE OR RE-RENDED');
  }
}



ReactDOM.render(<App />, document.querySelector("#root"));
