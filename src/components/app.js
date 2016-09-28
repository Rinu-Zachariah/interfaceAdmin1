import React, {Component} from 'react';
import Menu from './views/Menu';
import styles from '../css/main.css';

class App extends Component{
  render() {
    return(
      <div>
      <header>
        <h1>interFACE Admin</h1>
      </header>
        <div className="leftNav">

          <Menu />

        </div>
        <div className="mainContainer">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
