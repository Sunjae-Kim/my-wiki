import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  
  state = {
    // state의 초기화
    lat: null,
    errorMessage: ""
  };

  renderContent(){
    // 사용자 거부 시
    if (this.state.errorMessage && !this.state.lat) {
      return (<div><p>Error: {this.state.errorMessage}</p></div>);
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
      <div style={{border: 'solid red 10px'}}>
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
