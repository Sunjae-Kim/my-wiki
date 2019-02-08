import React from 'react'

/* 최종적으로 return 하는 tag는 1개여야만 한다. */
export default function ApprovalCard(props) {
  return (
    <div className="ui card">
      <div className="content">
        { props.children }
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Approve</div>
          <div className="ui basic red button">Decline</div>
        </div>
      </div>
    </div>
  )
}