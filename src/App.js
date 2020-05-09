import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="nav-bar">
          <span className="header"><Link to="/">Annie Phan</Link></span>
          <span className="links">
            <span className="link"><Link to="/projects">Projects</Link></span>
            <span className="link"><Link to="/bio">Bio</Link></span>
            <span className="link"><Link to="/contact">Contact</Link></span>
          </span>
        </div>
        <hr/>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default App;