import React from 'react'
import './SeasonDisplay.css';

const getSeason = (month, lat) => {
  if (month > 2 && month < 9){
    return lat > 0 ? 'summer' : 'winter'; // ternary
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
}

const seasonConfig = {
  summer: {
    text: '더워요',
    iconName: 'sun'
  },
  winter: {
    text: '추워요',
    iconName: 'snowflake'
  }
}

const SeasonDisplay = (props) => {
  const season = getSeason(new Date().getMonth(), props.lat);
  const { text, iconName } = seasonConfig[season];
  return (
    <div className={`season-display ${season}`}>
      <i className={`icon ${iconName} massive upper-left`}/>
      <h1>{ text }</h1>
      <i className={`icon ${iconName} massive bottom-right`}/>
    </div>
  )
}

export default SeasonDisplay;