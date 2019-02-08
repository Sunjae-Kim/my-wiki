import React from 'react'
import { connect } from 'react-redux'

const Songdetail = ({song}) => {
  return (
    <div>
      <h1>Details</h1>
      { renderSongDetail(song) }
    </div>
  )
}

const renderSongDetail = song => {
  if(!song){
    return (<div>select a song!</div>)
  } else {
    return Object.keys(song).map( key => {
      return (
        <p key={key} > { key } : { song[key] } </p>
      )
    })
  }
}

const mapStateToProps = state => {
  return {
    song : state.selectedSong
  }
}

export default connect(mapStateToProps)(Songdetail);