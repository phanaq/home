import React, { Component } from 'react';
import $ from 'jquery';

class Bio extends Component {
  constructor(props) {
    super(props);

    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    $('.bio-image').fadeIn();
    $('.bio-page').fadeIn();
  }

  render() {
    return (
      <div hidden className="bio-page">
        <div className="bio-image-container">
          <img hidden 
            className="bio-image" 
            src={"https://s3.amazonaws.com/images.phanaq.com/annie_cropped.jpeg"} 
            alt="annie_cropped.jpeg"
            onLoad={this.handleLoad}/>
        </div>
        <h3>Bio</h3>
        <div className="bio-text">
          Annie Phan is a photographer and a multimedia journalist living in Santiago, Chile.
          Previously, she has worked as a software engineer for start-ups and mid-sized companies based out of Boston and San Francisco.
          Annie grew up in Texas and studied at MIT, where she got a bachelor's degree in Electrical Engineering and Computer Science.
        </div>
      </div>
    )
  }
}

export default Bio;
