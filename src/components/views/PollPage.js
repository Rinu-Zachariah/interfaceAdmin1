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
      <h2>POLLS</h2>
      <p className="blue">Add Delete or Edit Polls</p>
      <table style={{textAlign:"left"}}className="table">
        <thead>
          <tr>
            <th>choice</th>
            <th>isActive</th>
            <th>question</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input className="form-control"/></td>
            <td><input className="form-control"/></td>
            <td><input className="form-control"/></td>
            <td><button className="btn btn-primary" onClick={this.onClickSave} value="save">Add Event</button></td>
          </tr>
          {this.props.poll.map(this.pollRow)}
        </tbody>
      </table>        
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
