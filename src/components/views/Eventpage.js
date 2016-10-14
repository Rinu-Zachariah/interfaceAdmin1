import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as eventsActions from '../../actions/eventsActions';
import $ from 'jquery';


class EventPage extends Component{

  constructor(props, context) {
    super(props, context);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onEventTextChange = this.onEventTextChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.eventRow = this.eventRow.bind(this);

    this.state = {
      events: {eventText: '',
      startDate: '' ,
      endDate: '',
      type: ''
      }
    };
  }

  getInitialState() {
    return {
      invalidData: true,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.events.startDate && nextState.events.endDate);
  }


  onStartDateChange(event){
    const events = this.state.events;
    events.startDate = event.target.value;
    this.setState({events: events});
  }

  onEndDateChange(event){
    const events = this.state.events;
    events.endDate = event.target.value;
    this.setState({events: events});
  }

  onTypeChange(event){
    const events = this.state.events;
    events.type = event.target.value;
    this.setState({events: events});
  }

  onEventTextChange(event){
    const events = this.state.events;
    events.eventText = event.target.value;
    this.setState({events: events});
  }


  onClickSave(){
    const propObject = this.props;
    $.ajax({
      type: "POST",
      url: '',
      data: this.state.events,
      success: function(data){
        console.log(data);
        propObject.dispatch(eventsActions.createEvents(data));
      },
      error: function(data){
        alert('error');
      }
    });

  }
  onDeleteEvent(eventObject){
    console.log(eventObject);
    $.ajax({
    url: '',
    type: "DELETE",
    data: eventObject,
    success: function(data){
      console.log(data);
    }
  });
    this.props.dispatch(eventsActions.deleteEvents(eventObject))
  }


  eventRow(event,index){
    return(
      <tr key={index}>
        <td>{event.startDate.split("T")[0]}</td>
        <td>{event.endDate.split("T")[0]}</td>
        <td>{event.type}</td>
        <td>{event.eventText}</td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteEvent(event)}} value="delete">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
  }

  render(){
    return (
        <div>
          <h2>EVENTS</h2>
          <table>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="date" className="form-control"  onChange={this.onStartDateChange} value={this.state.events.startDate}/></td>
                <td><input type="date" className="form-control" onChange={this.onEndDateChange} value={this.state.events.endDate}/></td>
                <td>
                <select className="form-control" onChange={this.onTypeChange} value={this.state.events.type}>
                  <option hidden>Please select</option>
                  <option>Birthday</option>
                  <option>Certification</option>
                  <option>Event</option>
                  <option>Others</option>
                </select>
                </td>
                <td><input className="form-control eventHead" onChange={this.onEventTextChange} value={this.state.events.eventText}/></td>
                <td><button className="btn btn-primary" onClick={this.onClickSave} id="save" value="save" disabled={this.state.invalidData}>Add Event</button></td>
              </tr>
              {this.props.events.map(this.eventRow)}
            </tbody>
          </table>
        </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    events: state.events
  };
}

export default connect(mapStateToProps)(EventPage);
