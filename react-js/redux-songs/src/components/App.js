import React from 'react'
import Songlist from './Songlist';
import Songdetail from './Songdetail';

const App = () => {
  return (
    <div className="ui container grid">
      <div className="ui row">
        <div className="column eight wide">
          <Songlist />
        </div>
        <div className="column eight wide">
          <Songdetail />
        </div>
      </div>
    </div>
  )
}

export default App;