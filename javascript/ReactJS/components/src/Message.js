import React from 'react'

export default function Message(props) {
  return (
    <div className="ui message">
      <div className="header">
        { props.header }
      </div>
      <p>
        { props.paragraph } ?
      </p>
    </div>
  )
}
