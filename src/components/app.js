import React, {Component} from 'react';
import Menu from './views/Menu';
import styles from '../styles/main.css'

class App extends Component{
  render() {
    return(
      <div>
        <div className="mainMenu">
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
