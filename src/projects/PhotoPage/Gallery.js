import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Image from './Image.js';


class Gallery extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(imageData) {
    this.props.openLightbox(imageData.index);
  }

  render() {
    const images = this.props.images;
    var col0 = [], col1 = [], col2 = [];
    var columns = [col0, col1, col2];
    var whichCol = 0;
    for (var i=0; i<images.length; i++) {
      var image = images[i];
      image.index = i;
      columns[whichCol].push(image);
      whichCol = (whichCol + 1) % 3;
    }
    const handleClick = this.handleClick;
    return (
      <Grid fluid={true}>
        <Row>
          {columns.map((column) =>
            <Col sm={4} key={columns.indexOf(column)}>
              {column.map((image) => 
                  <Image 
                    key={column.indexOf(image)}
                    imageData={image}
                    handleClick={handleClick}/>
              )}
            </Col>
          )}
        </Row>
      </Grid>
    )
  }
}

export default Gallery;
