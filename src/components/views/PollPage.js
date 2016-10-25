import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PollActions from '../../actions/PollActions';
import Accordion from './Accordion.js';
import $ from 'jquery';
import env from '../../environment';
import init from '../../../tools/init';


class PollPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.pollRow=this.pollRow.bind(this);
    this.choicesRow=this.choicesRow.bind(this);
    this.onQuestionChange=this.onQuestionChange.bind(this);
    this.onChoice1Change=this.onChoice1Change.bind(this);
    this.onChoice2Change=this.onChoice2Change.bind(this);
    this.onChoice3Change=this.onChoice3Change.bind(this);
    this.onChoice4Change=this.onChoice4Change.bind(this);
    this.onisActiveChange=this.onisActiveChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    // this.onDeletePoll = this.onDeletePoll.bind(this);

    this.state = {
      poll: {
        choice1:'',
        choice2:'',
        choice3:'',
        choice4:'',
        isActive: false,
        question: ''
      }
    };
  }

  onQuestionChange(event){
      const poll = this.state.poll;
      poll.question = event.target.value;
      this.setState({poll: poll});
  }

  onChoice1Change(event){
      const poll = this.state.poll;
      console.log(poll);
      console.log(event.target.value);
      poll.choice1 = event.target.value;
      this.setState({poll: poll});
  }
  onChoice2Change(event){
      const poll = this.state.poll;
      poll.choice2 = event.target.value;
      this.setState({poll: poll});
  }
  onChoice3Change(event){
      const poll = this.state.poll;
      poll.choice3 = event.target.value;
      this.setState({poll: poll});
  }
  onChoice4Change(event){
      const poll = this.state.poll;
      poll.choice4 = event.target.value;
      this.setState({poll: poll});
  }

  onisActiveChange(event){
    const poll = this.state.poll;
    poll.isActive = event.target.value;
    this.setState({poll: poll});
  }

  onClickSave(){
    const propObject = this.props;
    console.log(this.state.poll);
    console.log(this.props.poll);
    const option1 = {
      count: 0,
      option_text: this.state.poll.choice1
    };
    const option2 = {
      count: 0,
      option_text: this.state.poll.choice2
    };
    const option3 = {
      count: 0,
      option_text: this.state.poll.choice3
    };
    const option4 = {
      count: 0,
      option_text: this.state.poll.choice4
    };
    const choices = [];
    choices.push(option1);
    choices.push(option2);
    choices.push(option3);
    choices.push(option4);

    console.log(choices);
    const polls={
      isActive: this.state.poll.isActive,
      question: this.state.poll.question,
      choices: choices
    };
    console.log(polls);
    $.ajax({
      type:'POST',
      url: env[init.env()].polls,
      data: polls,
      success: function(data){
        console.log(data);
        propObject.dispatch(PollActions.createPolls(data));
      },
      error: function(data){
        alert('error');
      }
    });
  }

  // onDeletePoll(pollObject){
  //   console.log(pollObject);
  //   $.ajax({
  //     url: '',
  //     type: 'DELETE',
  //     data: pollObject,
  //     success: function(data){
  //       console.log(data);
  //     }
  //   });
  //   this.props.dispatch(PollActions.deletePolls(pollObject));
  // }

  choicesRow(choice, index){
    return(
      <li key={index}>{choice.option_text}</li>
    );
  }

  pollRow(event,index){
    return(
      <div key={index}>
      <Accordion data={event.choices.map(this.choicesRow)} year={event.question} event1={event}/>
      </div>
    );
  }

  render(){
    return (
      <div>
      <h2>POLLS</h2>
      <table style={{textAlign:"left"}}className="table">
        <thead>
          <tr>
            <th>question</th>
            <th>choice1</th>
            <th>choice2</th>
            <th>choice3</th>
            <th>choice4</th>
            <th>isActive</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input className="form-control" onChange={this.onQuestionChange} value={this.state.poll.question}/></td>
            <td><input className="form-control" onChange={this.onChoice1Change} value={this.state.poll.choice1}/></td>
            <td><input className="form-control" onChange={this.onChoice2Change} value={this.state.poll.choice2}/></td>
            <td><input className="form-control" onChange={this.onChoice3Change} value={this.state.poll.choice3}/></td>
            <td><input className="form-control" onChange={this.onChoice4Change} value={this.state.poll.choice4}/></td>
            <td><select className="form-control" onChange={this.onisActiveChange} value={this.state.poll.isActive}>
              <option hidden>Please select</option>
              <option>true</option>
              <option>false</option>
            </select></td>
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
