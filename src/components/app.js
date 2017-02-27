import React, {Component} from 'react';
import Menu from './views/Menu';
import styles from '../css/main.css';
import $ from 'jquery';

class App extends Component{
  render() {
    return(
      <div>
        <header className="container-fluid col-md-12">
            <span className="head head-first">inter</span>
            <span className="head head-one">F</span>
            <span className="head head-two">A</span>
            <span className="head head-three">C</span>
            <span className="head head-four">E</span>
            &nbsp; ADMIN
        </header>
        <Menu  />
        <div className = "col-md-offset-1 col-md-11 col-sm-offset-1 col-xs-offset-1 mainContainer">
            {this.props.children}
        </div>

      </div>
    );
  }
}

export default App;
