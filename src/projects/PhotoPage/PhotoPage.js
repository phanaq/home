import React, { Component } from 'react';
import Lightbox from 'react-images';
import $ from 'jquery';

import Gallery from './Gallery';
import GalleryHeader from './GalleryHeader';

class PhotoPage extends Component {
  constructor() {
    super();

    this.state = {
      lightboxIsOpen: false,
      currentImageIndex: 0,
      title: '',
      description: '',
      imageObjs: [],
      imageObjsLarge: []
    }

    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  componentWillMount() {
    const photosUrl = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=662c310d0791a27195be32b37572a11d&photoset_id="+this.props.photosetId+"&user_id=137560096%40N02&format=json&nojsoncallback=1";
    const photosSettings = { "async": true, "crossDomain": true, "url": photosUrl, "method": "GET", "headers": {} };
    var self = this;
    $.ajax(photosSettings).done(function (data) {
      var imageObjs = [];
      var imageObjsLarge = [];
      $.each(data.photoset.photo, function( i, gp ) {
        const src = 'https://farm'+gp.farm+'.staticflickr.com/'+gp.server+'/'+gp.id+'_'+gp.secret+'.jpg';
        const srcLarge = 'https://farm'+gp.farm+'.staticflickr.com/'+gp.server+'/'+gp.id+'_'+gp.secret+'_b.jpg';
        const obj = {src: src};
        imageObjs.push(obj);
        const largeObj = {src: srcLarge};
        imageObjsLarge.push(largeObj);
      });
      self.setState({
        title: data.photoset.title,
        imageObjs: imageObjs,
        imageObjsLarge: imageObjsLarge
      });
    });

    const infoUrl = "https://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=662c310d0791a27195be32b37572a11d&photoset_id="+this.props.photosetId+"&user_id=137560096%40N02&format=json&nojsoncallback=1";
    const infoSettings = { "async": true, "crossDomain": true, "url": infoUrl, "method": "GET", "headers": {} };
    $.ajax(infoSettings).done(function (data) {
      self.setState({ description: data.photoset.description._content });
    });
  }

  gotoPrevious() {
    var newImageIndex = this.state.currentImageIndex - 1;
    this.setState({ currentImageIndex: newImageIndex });
  }

  gotoNext() {
    var newImageIndex = this.state.currentImageIndex + 1;
    this.setState({ currentImageIndex: newImageIndex });
  }
  
  openLightbox(imageIndex) {
    this.setState({ 
      lightboxIsOpen: true,
      currentImageIndex: imageIndex
    });
  }
  
  closeLightbox() {
    this.setState({ lightboxIsOpen: false });
  }

  render() {
    return (
    <div>
      <GalleryHeader 
        title={this.state.title}
        description={this.state.description}/>
      <Gallery
        images={this.state.imageObjs}
        openLightbox={this.openLightbox}/>
      <Lightbox
        images={this.state.imageObjsLarge}
        isOpen={this.state.lightboxIsOpen}
        currentImage={this.state.currentImageIndex}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
        backdropClosesModal={true}
      />
    </div>
    )
  }
}

export default PhotoPage;
