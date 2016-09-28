import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PollActions from '../../actions/PollActions';

class PollPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      poll: {choice: {},
      isActive: '',
      question: ''
      }
    };
  }

  pollRow(event,index){
    return(
      <tr key={index}>
        <td>{event.choice}</td>
        <td>{event.isActive}</td>
        <td>{event.question}</td>
        <td><button className="btn btn-danger">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
  }

  render(){
    return (
      <div>
        <h1>Induction</h1>
        {this.props.poll.map(this.pollRow)}
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
