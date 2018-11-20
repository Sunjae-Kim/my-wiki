import React from 'react'
import './Error.css'

export default function Error(props) {
  return (
    <div className="my_error">
      <i className="x icon massive" />
      <h1>
        { props.message }
      </h1>
    </div>
  )
}

Error.defaultProps = {
  message: 'Error가 발생했습니다..'
}