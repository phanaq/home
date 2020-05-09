import React, { Component } from 'react';
import $ from 'jquery';

class Contact extends Component {
  componentDidMount() {
    setTimeout(function() { 
      $('.contact-page').fadeIn();
    }, 100);
  }

  render() {
    return (
      <div hidden className="contact-page">
        <div>Currently in Santiago, Chile</div>
        <div><a href="mailto:anniephan96@gmail.com">anniephan96@gmail.com</a></div>
      </div>
    )
  }
}

export default Contact;
