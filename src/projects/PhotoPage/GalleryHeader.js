import React from 'react';

function GalleryHeader(props) {
  return (
    <div className="gallery-header">
      <h3>{props.title}</h3>
      <div>{props.description}</div>
    </div>
  );
}

export default GalleryHeader;