import React, { Component } from 'react';
import placeholder from './placeholder.png';
import $ from 'jquery';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      inViewport: false,
      loaded: false
    }; 

    this.isComponentVisible = this.isComponentVisible.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }
  
  componentDidMount() {
    var intervalId = setInterval(this.isComponentVisible, 300);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  isComponentVisible() {
    var element = document.getElementById(this.props.imageData.src);
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    if (rect.top <= (window.innerHeight || html.clientHeight)) { 
      this.setState({ inViewport: true });
      clearInterval(this.state.intervalId);
    }
  }

  onLoad() {
    if (this.state.inViewport) {
      this.setState({ loaded: true });
      const selector = ".gallery-image-"+this.props.imageData.index;
      $(selector).fadeIn();
    }
  }

  render() {
    const imageData = this.props.imageData;
    const src = this.state.inViewport ? imageData.src : placeholder;
    const placeholderClassName = this.state.loaded ? "hidden" : "placeholder";
    const classNames="gallery-image gallery-image-"+imageData.index;
    const hoverOverlay = this.props.showProjectText ? (
      <div className="project-text-container">
        <div className="project-text">
          {imageData.title}
        </div>
      </div>
    ) : '';

    return (
      <div id={imageData.src} className="image-container" onClick={()=>{this.props.handleClick(imageData)}}>
        <div className={placeholderClassName}></div>
        {hoverOverlay}
        <img hidden
          key={imageData.index}
          src={src} 
          className={classNames}
          alt={src}
          onLoad={this.onLoad}/>
      </div>
    );
  }
}

export default Image;
