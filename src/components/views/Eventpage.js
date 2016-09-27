import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as eventsActions from '../../actions/eventsActions';

class EventPage extends Component{

  render(){
    console.log(this.props);
    return (
      <div>
        <h1>Events</h1>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log("Inside mapping Events")
  console.log(state.events)
  return {
    events: state.events
  };
}

export default connect(mapStateToProps)(EventPage);
