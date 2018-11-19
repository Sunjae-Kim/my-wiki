import React from 'react'

export default function Segment(props) {
  const test = 'test';
  return (
    <div className="ui placeholder segment">
      { props.children }
    </div>
  )
}