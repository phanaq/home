import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import Image from './PhotoPage/Image.js';


class Projects extends Component {
  constructor(props) {
    super(props);

    this.projectIds = ["72157692954492392", "72157696123080405", "72157668281205868", "72157689937936856"];
    this.getPathname = {
      "72157692954492392": "/projects/pancho",
      "72157696123080405": "/projects/la_profesora",
      "72157668281205868": "/projects/la_vega",
      "72157689937936856": "/projects/boston_pets"
    }
    this.getOrder = {
      "72157692954492392": 0,
      "72157696123080405": 1,
      "72157668281205868": 2,
      "72157689937936856": 3
    }
    this.state = {
      projectInfoArray: []
    }

    this.getProjects = this.getProjects.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.getProjects();
  }

  getProjects() {
    for (var i = 0; i < this.projectIds.length; i++) {
      const photosetId = this.projectIds[i];
      const photosUrl = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=662c310d0791a27195be32b37572a11d&photoset_id="+photosetId+"&user_id=137560096%40N02&format=json&nojsoncallback=1";
      const photosSettings = { "async": true, "crossDomain": true, "url": photosUrl, "method": "GET", "headers": {} };
      var self = this;
      // eslint-disable-next-line
      $.ajax(photosSettings).done(function (data) {
        const gp = data.photoset.photo[0]
        const coverUrl = 'https://farm'+gp.farm+'.staticflickr.com/'+gp.server+'/'+gp.id+'_'+gp.secret+'.jpg';
        const projectInfo = {
          order: self.getOrder[photosetId],
          title: data.photoset.title,
          src: coverUrl,
          pathname: self.getPathname[photosetId]
        }
        var joined = self.state.projectInfoArray.concat(projectInfo);
        self.setState({ projectInfoArray: joined });
      });
    }
  }

  handleClick(imageData) {
    this.props.history.push(imageData.pathname);
  }

  render() {
    if (this.state.projectInfoArray.length < this.projectIds.length) { return null; }
    var projects = this.state.projectInfoArray;
    projects.sort(function(a,b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} );
    var col0 = [], col1 = [];
    var columns = [col0, col1];
    var whichCol = 0;
    for (var i=0; i<projects.length; i++) {
      var project = projects[i];
      project.index = i;
      columns[whichCol].push(project);
      whichCol = (whichCol + 1) % 2;
    }
    const handleClick = this.handleClick;
    return (
  	<div>
      <Grid fluid={true}>
        <Row>
          {columns.map((column) =>
            <Col sm={6} key={columns.indexOf(column)}>
              {column.map((project) => 
                <Image 
                  key={column.indexOf(project)}
                  imageData={project}
                  handleClick={handleClick}
                  showProjectText={true}/>
              )}
            </Col>
          )}
        </Row>
      </Grid>
		</div>
    )
  }
}

export default withRouter(Projects);
