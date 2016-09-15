import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

class componentName extends Component{
  render(){
    return(
      <div className="container-fluid">
      <nav>
        <IndexLink to="/">Home</IndexLink>
        {"  |  "}
        <Link to="/events">Events</Link>
        {"  |  "}
        <Link to="/polls">Poll</Link>
        {"  |  "}
        <Link to="/odchistory">ODC History</Link>
        {"  |  "}
        <Link to="/induction">Induction</Link>
        {"  |  "}
        <Link to="/gallery">Gallery</Link>
        {"  |  "}
        <Link to="/trainings">Trainings</Link>
        {"  |  "}
        <Link to="/contributors">Contributors</Link>
      </nav>
      </div>
    );
  }
}

export default componentName;
