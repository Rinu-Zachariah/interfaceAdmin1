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
    this.onEditEvent = this.onEditEvent.bind(this);
    this.onClickEditSave = this.onClickEditSave.bind(this);

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
      url: 'http://dev-sandbox-lx61.amdc.mckinsey.com:4000/events',
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
    url: 'http://dev-sandbox-lx61.amdc.mckinsey.com:4000/events',
    type: "DELETE",
    data: eventObject,
    success: function(data){
      console.log(data);
    }
  });
    this.props.dispatch(eventsActions.deleteEvents(eventObject))
  }

  onEditEvent(eventObject){
    console.log(eventObject);
    console.log("events before editing")
    console.log(this.state.events);
    const events = this.state.events;
    events.type = eventObject.type;
    events.startDate = eventObject.startDate.split("T")[0];
    events.endDate = eventObject.endDate.split("T")[0];
    events.eventText = eventObject.eventText;
    console.log("events after editing")
    console.log(events);

    this.setState({events: events});
    this.props.dispatch(eventsActions.isEditingEvents(eventObject));
  }

  onClickEditSave(index){
    console.log(index);
    //this.setState({events: });
    // const propObject = this.props;
    // $.ajax({
    //   type: "POST",
    //   url: 'http://dev-sandbox-lx61.amdc.mckinsey.com:4000/events',
    //   data: this.state.events,
    //   success: function(data){
    //     console.log(data);
    //     propObject.dispatch(eventsActions.createEvents(data));
    //   },
    //   error: function(data){
    //     alert('error');
    //   }
    // });
    this.props.dispatch(eventsActions.editEvents(this.state.events,index));
  }

  eventRow(event,index){
    if(event.isEditing)
    {
      return(
        <tr key={index}>
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
          <td><button className="btn btn-primary" onClick={()=>{this.onClickEditSave(event._id)}} id="save" value="save" disabled={this.state.invalidData}>Done</button></td>
        </tr>
      )
    }
    return(
      <tr key={index}>
        <td>{event.startDate.split("T")[0]}</td>
        <td>{event.endDate.split("T")[0]}</td>
        <td>{event.type}</td>
        <td>{event.eventText}</td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteEvent(event)}} value="delete">Remove</button></td>
        <td><button className="btn btn-warning" onClick={()=>{this.onEditEvent(event)}} >Edit</button></td>
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
                <td><input type="date" className="form-control"  onChange={this.onStartDateChange} /></td>
                <td><input type="date" className="form-control" onChange={this.onEndDateChange} /></td>
                <td>
                <select className="form-control" onChange={this.onTypeChange}>
                  <option hidden>Please select</option>
                  <option>Birthday</option>
                  <option>Certification</option>
                  <option>Event</option>
                  <option>Others</option>
                </select>
                </td>
                <td><input className="form-control eventHead" onChange={this.onEventTextChange}/></td>
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
