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

  getInitialState() {
    return {
      invalidData: true,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.poll.question && nextState.poll.choice1 && nextState.poll.choice2 && nextState.poll.choice3 && nextState.poll.choice4 && nextState.poll.isActive);
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
    const clearQues = this.refs.clearQues;
    const clearC1 = this.refs.clearC1;
    const clearC2 = this.refs.clearC2;
    const clearC3 = this.refs.clearC3;
    const clearC4 = this.refs.clearC4;
    const clearSelect = this.refs.clearSelect;

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
        clearQues.value = "";
        clearC1.value = "";
        clearC2.value = "";
        clearC3.value = "";
        clearC4.value = "";
        clearSelect.value = "";
      },
      error: function(data){
        alert('error');
      }
    });
  }

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
      <div className="table-responsive">
      <table style={{textAlign:"left"}}className="table">
        <thead>
          <tr className="table-row">
            <th>question</th>
            <th>choice1</th>
            <th>choice2</th>
            <th>choice3</th>
            <th>choice4</th>
            <th>isActive</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td><input className="form-control" ref="clearQues" id="clearQues" onChange={this.onQuestionChange} value={this.state.poll.question}/></td>
            <td><input className="form-control" ref="clearC1" id="clearC1" onChange={this.onChoice1Change} value={this.state.poll.choice1}/></td>
            <td><input className="form-control" ref="clearC2" id="clearC2" onChange={this.onChoice2Change} value={this.state.poll.choice2}/></td>
            <td className="table-cell"><input className="form-control" ref="clearC3" id="clearC3" onChange={this.onChoice3Change} value={this.state.poll.choice3}/></td>
            <td className="table-cell"><input className="form-control" ref="clearC4" id="clearC4" onChange={this.onChoice4Change} value={this.state.poll.choice4}/></td>
            <td className="table-cell"><select className="form-control" ref="clearSelect" id="clearSelect" onChange={this.onisActiveChange} value={this.state.poll.isActive}>
              <option hidden>Please select</option>
              <option>true</option>
              <option>false</option>
            </select></td>
            <td className="table-cell"><button className="btn btn-primary" onClick={this.onClickSave} value="save" disabled={this.state.invalidData}>Add Event</button></td>
          </tr>
        </tbody>
      </table>
      </div>
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
