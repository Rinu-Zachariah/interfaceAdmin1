import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as mandatorytrainingActions from '../../actions/mandatorytrainingActions';
import $ from 'jquery';

class TrainingsPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.createdAtDate = this.createdAtDate.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onEventLinkChange = this.onEventLinkChange.bind(this);
    this.onEventNameChange = this.onEventNameChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.mandatorytrainingsRow = this.mandatorytrainingsRow.bind(this);
    this.state = {
      mandatorytrainings: {created_at: {},
      link: '',
      name: '',
      priority: ''
      }
    };
  }

  createdAtDate(event){
    const mandatorytrainings = this.state.mandatorytrainings;
    mandatorytrainings.created_at = event.target.value;
    this.setState({mandatorytrainings: mandatorytrainings});
  }

  onTypeChange(event){
    const mandatorytrainings = this.state.mandatorytrainings;
    mandatorytrainings.priority = event.target.value;
    this.setState({mandatorytrainings: mandatorytrainings});
  }

  onEventLinkChange(event){
    const mandatorytrainings = this.state.mandatorytrainings;
    mandatorytrainings.link = event.target.value;
    this.setState({mandatorytrainings: mandatorytrainings});
  }

  onEventNameChange(event){
    const mandatorytrainings = this.state.mandatorytrainings;
    mandatorytrainings.name = event.target.value;
    this.setState({mandatorytrainings: mandatorytrainings});
  }

  onClickSave(){
    const propObject = this.props;
    $.ajax({
      type: "POST",
      url: 'http://dev-sandbox-lx61.amdc.mckinsey.com:4000/mandatorytrainings',
      data: this.state.mandatorytrainings,
      success: function(data){
        console.log(data);
        propObject.dispatch(mandatorytrainingActions.createMandatoryTrainings(data));
      },
      error: function(data){
        alert('error');
      }
    });

  }

  onDeleteEvent(mandatorytrainings){
    console.log(mandatorytrainings);
    $.ajax({
      url: 'http://dev-sandbox-lx61.amdc.mckinsey.com:4000/mandatorytrainings',
      type: "DELETE",
      data: mandatorytrainings,
      success: function(data){
        console.log(data);
      }
    });
    this.props.dispatch(mandatorytrainingActions.deleteMandatoryTrainings(mandatorytrainings))
  }

  mandatorytrainingsRow(event,index){
    console.log(event);
    return(
      <tr key={index}>
        <td>{event.created_at.split("T")[0]}</td>
        <td>{event.link}</td>
        <td>{event.name}</td>
        <td>{event.priority}</td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteEvent(event)}} value="delete">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
  }

  render(){
    return (
      <div>
      <h2>TRAININGS</h2>
      <table style={{textAlign:"left"}}className="table">
        <thead>
          <tr>
            <th>Created at</th>
            <th>Link</th>
            <th>Name</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="date" className="form-control"  onChange={this.createdAtDate} value={this.state.mandatorytrainings.created_at}/></td>
            <td><input className="form-control eventHead" onChange={this.onEventLinkChange} value={this.state.mandatorytrainings.link}/></td>
            <td><input className="form-control eventHead" onChange={this.onEventNameChange} value={this.state.mandatorytrainings.name}/></td>
            <td>
            <select className="form-control" onChange={this.onTypeChange} value={this.state.mandatorytrainings.priority}>
              <option hidden>Please select</option>
              <option>high</option>
              <option>medium</option>
              <option>low</option>
            </select>
            </td>
            <td><button className="btn btn-primary" onClick={this.onClickSave} value="save">Add Event</button></td>
          </tr>
          {this.props.mandatorytrainings.map(this.mandatorytrainingsRow)}
        </tbody>
      </table>
    </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    mandatorytrainings: state.mandatorytrainings
  };
}

export default connect(mapStateToProps)(TrainingsPage);
