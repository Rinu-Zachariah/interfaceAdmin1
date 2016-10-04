import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PollActions from '../../actions/PollActions';
import Accordion from './Accordion.js'

class PollPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.pollRow=this.pollRow.bind(this);
    this.choicesRow=this.choicesRow.bind(this);

    this.state = {
      poll: {choice: {},
      isActive: '',
      question: ''
      }
    };
  }

  choicesRow(choice, index){
    return(
      <tr>{choice.option_text}</tr>
    )
  }

  pollRow(event,index){
    return(
      <div key={index}>
      <Accordion data={event.choices.map(this.choicesRow)} year={event.question} />
      </div>
    )
  }

  render(){
    return (
      <div>
      <h2>POLLS</h2>
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

        </tbody>
      </table>
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
