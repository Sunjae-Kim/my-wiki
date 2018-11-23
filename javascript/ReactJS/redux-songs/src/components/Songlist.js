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