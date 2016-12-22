import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

class ComponentName extends Component{
  render(){
    return(
      <div className="container-fluid">
      <div className="area" />
      <nav className="main-menu">
                <ul>
                    <li>
                        <IndexLink to="/">

                            <i className="fa fa-home"></i>

                            <span className="nav-text">
                                Home
                            </span>
                        </IndexLink>

                    </li>
                    <li className="has-subnav">
                        <Link to="/events">

                            <i className="fa fa-list"></i>

                            <span className="nav-text">
                                Events
                            </span>
                        </Link>

                    </li>
                    <li className="has-subnav">
                        <Link to="/polls">

                           <i className="fa fa-bar-chart-o"></i>

                            <span className="nav-text">
                                Polls
                            </span>
                        </Link>

                    </li>
                    <li className="has-subnav">
                        <Link to="/odchistory">

                           <i className="fa fa-history"></i>

                            <span className="nav-text">
                                History
                            </span>
                        </Link>

                    </li>
                    <li>
                        <Link to="/induction">

                            <i className="fa fa-folder-open-o"></i>

                            <span className="nav-text">
                                Induction
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/gallery">

                            <i className="fa fa-picture-o"></i>

                            <span className="nav-text">
                                Gallery
                            </span>
                        </Link>
                    </li>
                    <li>
                       <Link to="/trainings">

                           <i className="fa fa-graduation-cap"></i>

                            <span className="nav-text">
                                Trainings
                            </span>
                        </Link>
                    </li>
                    <li>
                       <Link to="/contributors">

                            <i className="fa fa-users"></i>

                            <span className="nav-text">
                                Contributors
                            </span>
                        </Link>
                    </li>
                    <li>
                       <Link to="/successstories">
                            <i className="fa fa-hand-peace-o fa-2x"></i>
                            <span className="nav-text">
                                Success Stories
                            </span>
                        </Link>
                    </li>
                    <li>
                       <Link to="/admins">
                            <i className="fa fa-user-circle-o"></i>
                            <span className="nav-text">
                                Admins
                            </span>
                        </Link>
                    </li>
                </ul>
              </nav>
              </div>
    );
  }
}

export default ComponentName;
