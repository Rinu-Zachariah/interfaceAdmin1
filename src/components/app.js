import React, {Component} from 'react';
import Menu from './views/Menu';

class App extends Component{
  render() {
    return(
      <div>
        hey people
        <Menu />
        {this.props.children}
      </div>
    );
  }
}

export default App;
