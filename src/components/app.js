import React, {Component} from 'react';
import Menu from './views/Menu';
import styles from '../css/main.css';

class App extends Component{
  render() {
    return(
      <div>

        <header>
            <span className="head head-first">inter</span>
            <span className="head head-one">F</span>
            <span className="head head-two">A</span>
            <span className="head head-three">C</span>
            <span className="head head-four">E</span>
            &nbsp; ADMIN
        </header>

        <div className="leftNav">

          <Menu />

        </div>
        <div className="mainContainer">
          <div className="hoverScroll">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
