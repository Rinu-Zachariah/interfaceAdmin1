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
              <IndexLink to="/"><span className="glyphicon glyphicon-home" />Home</IndexLink>
            </li>
            <li>
              <Link to="/events"><span className="glyphicon glyphicon-list-alt" />Events</Link>
            </li>
            <li>
              <Link to="/polls"><span className="glyphicon glyphicon-edit" />Poll</Link>
            </li>
            <li>
              <Link to="/odchistory"><span className="glyphicon glyphicon-fast-backward" />ODC History</Link>
            </li>
            <li>
              <Link to="/induction"><span className="glyphicon glyphicon-inbox" />Induction</Link>
            </li>
            <li>
              <Link to="/gallery"><span className="glyphicon glyphicon-th" />Gallery</Link>
            </li>
            <li>
              <Link to="/trainings"><span className="glyphicon glyphicon-th-list" />Trainings</Link>
            </li>
            <li>
              <Link to="/contributors"><span className="glyphicon glyphicon-user" />Contributors</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default ComponentName;
