import React from 'react'

export default function ImageList(props) {
  console.log(props.images);
  const images = props.images.map(image => {
    return <div key={ image.id } ><img alt={ image.description } src={image.urls.small} /></div>
  })
  return (
    <div>
      { images }
    </div>
  )
}