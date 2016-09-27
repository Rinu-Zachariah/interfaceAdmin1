import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PollActions from '../../actions/PollActions';

class PollPage extends Component{
  render(){
    return (
      <div>
        <h1>Polls</h1>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log("inside poll page");
  console.log(state.poll);
  return {
    poll: state.poll
  };
}

export default connect(mapStateToProps)(PollPage);
