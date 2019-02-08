import React, { Component } from 'react'

class SearchBar extends Component {

  state = {
    keyword: ''
  }

  badword = 'fuck';

  removeBadWords = (word) => {

    const result = word.indexOf(this.badword.toLocaleUpperCase());
    this.setState({ keyword: word }, () => {
      result > -1 ? this.setState({ keyword: this.state.keyword.replace(/fuck/i, '****') }) : this.setState({ keyword: word });
    })

  }

  componentDidUpdate(){
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onUserSubmit(this.state.keyword)
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
        <form onSubmit={ this.onFormSubmit } className="ui form">
          <label htmlFor="keyword">Search</label>
          <input 
          type="text" 
          id="keyword"
          onChange={e => this.removeBadWords(e.target.value) }
          value={ this.state.keyword }
          />
        </form>
      </div>
    )
  }
}

export default SearchBar;