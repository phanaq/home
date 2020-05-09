import React, { Component } from 'react';
import $ from 'jquery';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    $('.home-img').fadeIn();
  }

  render() {
    return (
      <div>
      <img hidden className="home-img"
        src='https://farm5.staticflickr.com/4571/38306350744_5444780fc1_k_d.jpg'
        alt="home-img"
        onLoad={this.handleLoad}>
      </img>
      </div>
    )
  }
}

export default Home;
