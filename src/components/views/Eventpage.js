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
    this.state = {
      events: {eventText: '',
      startDate: '' ,
      endDate: '',
      type: ''
      }
    };
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
    console.log(this.state.events);
    const temp = this.props;
    $.ajax({
      type: "POST",
      url: 'http://localhost:4000/events',
      data: this.state.events,
      success: function(data){
        console.log(data);
        temp.dispatch(eventsActions.createEvents(data));
      },
      error: function(data){
        alert('error');
      }
    });

  }

  eventRow(event,index){
    return(
      <tr key={index}>
        <td>{event.startDate.split("T")[0]}</td>
        <td>{event.endDate.split("T")[0]}</td>
        <td>{event.type}</td>
        <td>{event.eventText}</td>
        <td><button className="btn btn-danger">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
  }

  render(){
    return (
        <div>
          <h2>EVENTS</h2>
          <p className="blue">Add Delete or Edit Events</p>
          <table style={{textAlign:"left"}}className="table">
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
                <td><input type="date" className="form-control"  onChange={this.onStartDateChange} value={this.state.events.startDate} /></td>
                <td><input type="date" className="form-control" onChange={this.onEndDateChange} value={this.state.events.endDate}/></td>
                <td><input className="form-control" onChange={this.onTypeChange} value={this.state.events.type}/></td>
                <td><input className="form-control" onChange={this.onEventTextChange} value={this.state.events.eventText}/></td>
                <td><button className="btn btn-primary" onClick={this.onClickSave} value="save">Add Event</button></td>
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
