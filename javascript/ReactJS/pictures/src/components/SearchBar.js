import React, { Component } from 'react'



class SearchBar extends Component {

  state = {
    keyword: ''
  }

  /*
    Controlled Element
    Key 가 Typing 되는걸 state 에 update 해서
    state 의 value 를 input 에 보내줌.
    ( Input에서 typing 되는 내용을 보는게 아님 )
  */
  render() {
    return (
      <div className="ui segment container">
        <form className="ui form">
          <label htmlFor="keyword">Search</label>
          <input 
          type="text" 
          id="keyword"
          onChange={e => this.setState({ keyword: e.target.value.toUpperCase })}
          value={this.state.keyword}
          />
        </form>
      </div>
    )
  }
}

export default SearchBar;