import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

class ComponentName extends Component{
  render(){
    //    {"  |  "}
    return(
      <div className="container-fluid">
        <nav>
          <ul style={{listStyleType: "none"}}>
            <li>
              <IndexLink to="/">Home</IndexLink>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/polls">Poll</Link>
            </li>
            <li>
              <Link to="/odchistory">ODC History</Link>
            </li>
            <li>
              <Link to="/induction">Induction</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/trainings">Trainings</Link>
            </li>
            <li>
              <Link to="/contributors">Contributors</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default ComponentName;
