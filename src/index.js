import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './App.js';
import Home from './home/Home.js';
import Projects from './projects/Projects.js';
import PhotoPage from './projects/PhotoPage/PhotoPage.js';
import Bio from './bio/Bio.js';
import Contact from './contact/Contact.js';


ReactDOM.render(
	<Router>
		<App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/projects" component={Projects}/>
          <Route path="/projects/pancho" render={()=><PhotoPage photosetId={"72157692954492392"}/>}/>
          <Route path="/projects/la_profesora" render={()=><PhotoPage photosetId={"72157696123080405"}/>}/>
          <Route path="/projects/la_vega" render={()=><PhotoPage photosetId={"72157668281205868"}/>}/>
          <Route path="/projects/boston_pets" render={()=><PhotoPage photosetId={"72157689937936856"}/>}/>
        <Route path="/bio" component={Bio}/>
        <Route path="/contact" component={Contact}/>
        <Redirect to="/"/>
      </Switch>
		</App>
	</Router>,
	document.getElementById('root')
);

registerServiceWorker();
