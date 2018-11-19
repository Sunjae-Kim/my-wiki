import React from 'react'

// Comment Component를 만들어보자.
export default props => {
  return (
    <div className="comment">
      <a href="#" className="avatar">
        <img src={ props.img } alt="avatar" />
      </a>

      <div className="content">
        <a href="#" className="author">
          { props.author }
        </a>
        <div className="metadata">
          <span className="date">{ props.date }</span>
        </div>
        <div className="text">{ props.text }</div>
      </div>
    </div>
  )
}