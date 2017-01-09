import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import $ from 'jquery';

class ComponentName extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: ' '
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(value) {
    this.setState({
      active: value
    });
  }

  render(){
    return(
      <div className="container-fluid">
      <div className="area" />
      <nav className="main-menu">
                <ul>
                    <li className={(this.state.active === 'home') ? "active" : ""} onClick={()=>{this.toggle('home')}}>
                        <IndexLink to="/">

                            <i className="fa fa-home"></i>

                            <span className="nav-text">
                                Home
                            </span>
                        </IndexLink>

                    </li>
                    <li className={(this.state.active === 'events') ? "active" : ""} onClick={()=>{this.toggle('events')}}>
                        <Link to="/events">

                            <i className="fa fa-list"></i>

                            <span className="nav-text">
                                Events
                            </span>
                        </Link>

                    </li>
                    <li className={(this.state.active === 'polls') ? "active" : ""} onClick={()=>{this.toggle('polls')}}>
                        <Link to="/polls">

                           <i className="fa fa-bar-chart-o"></i>

                            <span className="nav-text">
                                Polls
                            </span>
                        </Link>

                    </li>
                    <li className={(this.state.active === 'odchistory') ? "active" : ""} onClick={()=>{this.toggle('odchistory')}}>
                        <Link to="/odchistory">

                           <i className="fa fa-history"></i>

                            <span className="nav-text">
                                History
                            </span>
                        </Link>

                    </li>
                    <li className={(this.state.active === 'induction') ? "active" : ""} onClick={()=>{this.toggle('induction')}}>
                        <Link to="/induction">

                            <i className="fa fa-folder-open-o"></i>

                            <span className="nav-text">
                                Induction
                            </span>
                        </Link>
                    </li>
                    <li className={(this.state.active === 'trainings') ? "active" : ""} onClick={()=>{this.toggle('trainings')}}>
                       <Link to="/trainings">
                           <i className="fa fa-graduation-cap"></i>

                            <span className="nav-text">
                                Trainings
                            </span>
                        </Link>
                    </li>
                    <li className={(this.state.active === 'successstories') ? "active" : ""} onClick={()=>{this.toggle('successstories')}}>
                       <Link to="/successstories">
                            <i className="fa fa-hand-peace-o fa-2x"></i>
                            <span className="nav-text">
                                Success Stories
                            </span>
                        </Link>
                    </li>
                    <li className={(this.state.active === 'admins') ? "active" : ""} onClick={()=>{this.toggle('admins')}}>
                       <Link to="/admins">
                            <i className="fa fa-user-circle-o"></i>
                            <span className="nav-text">
                                Admins
                            </span>
                        </Link>
                    </li>
                    <li className={(this.state.active === 'gallery') ? "active" : ""} onClick={()=>{this.toggle('gallery')}}>
                        <Link to="/gallery">
                            <i className="fa fa-picture-o"></i>

                            <span className="nav-text">
                                Gallery
                            </span>
                        </Link>
                    </li>
                    <li className={(this.state.active === 'contributors') ? "active" : ""} onClick={()=>{this.toggle('contributors')}}>
                       <Link to="/contributors">

                            <i className="fa fa-users"></i>

                            <span className="nav-text">
                                Contributors
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
