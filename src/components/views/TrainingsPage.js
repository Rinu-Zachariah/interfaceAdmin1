import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as mandatorytrainingActions from '../../actions/mandatorytrainingActions';
import $ from 'jquery';
import _ from 'underscore';
import env from '../../environment';
import init from '../../../tools/init';
let singleFieldEdit = true;

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
    this.onEditEvent = this.onEditEvent.bind(this);
    this.onClickEditSave = this.onClickEditSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      mandatorytrainings: {
        created_at: '',
        link: '',
        name: '',
        priority: ''
      },
      searchString: ''
    };
  }

  getInitialState() {
    return {
      invalidData: true,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.mandatorytrainings.created_at && nextState.mandatorytrainings.link && nextState.mandatorytrainings.name && nextState.mandatorytrainings.priority);
  }

  componentDidMount() {
    const propObject = this.props;
    $.get(env[init.env()].mandatorytrainings, function(data){
      propObject.getTrainings(data);
    });
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
    const clearText = this.refs.clearText;
    const clearStartDate = this.refs.clearStartDate;
    const clearText1 = this.refs.clearText1;
    const clearSelect = this.refs.clearSelect;
    $.ajax({
      type: "POST",
      url: env[init.env()].mandatorytrainings,
      data: this.state.mandatorytrainings,
      success: function(data){
        propObject.createMandatoryTrainings(data);
        clearText.value = "";
        clearStartDate.value = "";
        clearText1.value = "";
        clearSelect.value = "";
      },
      error: function(data){
        alert('error');
      }
    });

  }

  onDeleteEvent(mandatorytrainings){
    $.ajax({
      url: env[init.env()].mandatorytrainings,
      type: "DELETE",
      data: mandatorytrainings,
      success: function(data){
      }
    });
    this.props.deleteMandatoryTrainings(mandatorytrainings);
  }

  onEditEvent(eventObject){
    if (singleFieldEdit){
      const mandatorytrainings = this.state.mandatorytrainings;
      mandatorytrainings.created_at = eventObject.created_at.split("T")[0];
      mandatorytrainings.link = eventObject.link;
      mandatorytrainings.name = eventObject.name;
      mandatorytrainings.priority = eventObject.priority;

      this.setState({mandatorytrainings: mandatorytrainings});
      singleFieldEdit = false;
      this.props.isEditingMandatoryTrainings(eventObject);
    }
    else {
      alert('Please Finish Editing One Module');
    }

  }

  onClickEditSave(index){
    const mandatorytraining = this.state.mandatorytrainings;
    mandatorytraining._id = index;
    const propObject = this.props;
    singleFieldEdit = true;
    $.ajax({
      type: "PUT",
      url: env[init.env()].mandatorytrainings,
      data: mandatorytraining,
      success: function(data){
        propObject.editMandatoryTrainings(data);
      },
      error: function(data){
        alert('error');
      }
    });

  }

  handleChange(event){
    this.setState({searchString: event.target.value});
  }

  mandatorytrainingsRow(event,index){
    if(event.isEditing)
    {
      return(
        <tr key={index}>
          <td className="col-md-2"><input type="date" className="form-control"  onChange={this.createdAtDate} value={this.state.mandatorytrainings.created_at}/></td>
          <td className="col-md-2"><input className="form-control eventHead" onChange={this.onEventLinkChange} value={this.state.mandatorytrainings.link}/></td>
          <td className="col-md-2"><input className="form-control" onChange={this.onEventNameChange} value={this.state.mandatorytrainings.name}/></td>
          <td className="col-md-2">
          <select className="form-control" onChange={this.onTypeChange} value={this.state.mandatorytrainings.priority}>
            <option hidden>Please select</option>
            <option>high</option>
            <option>medium</option>
            <option>low</option>
          </select>
          </td>
          <td className="col-md-2"><button className="btn btn-primary" onClick={()=>{this.onClickEditSave(event._id);}} id="save" value="save" disabled={this.state.invalidData}>Done</button></td>
        </tr>
      );
    }
    return(
      <tr key={index}>

        <td className="col-md-2">{event.created_at.split("T")[0]}</td>
        <td className="col-md-2 longLink">{event.link}</td>
        <td className="col-md-2">{event.name}</td>
        <td className="col-md-2">{event.priority}</td>
        <td className="col-md-2"><button className="btn btn-danger" onClick={()=>{this.onDeleteEvent(event);}} value="delete">Remove</button></td>
        <td className="col-md-2"><button className="btn btn-warning" onClick={()=>{this.onEditEvent(event);}} >Edit</button></td>
      </tr>
    );
  }



  render(){
    let mandatorytrainings = this.props.mandatorytrainings;

    if(this.state.searchString.length > 0){

        let searchString = this.state.searchString.trim().toLowerCase();
        mandatorytrainings = mandatorytrainings.filter(function(l){
             return(l.link.toLowerCase().match(searchString) || l.name.toLowerCase().match(searchString) || l.priority.toLowerCase().match(searchString));

        });

    }
    return (
      <div>
        <div className="row">
          <div className="col-md-5"><h2>TRAININGS</h2></div>
          <div className="col-md-7"><input type="text" className="form-control" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" /></div>

        </div>
      <div className="table-responsive">
      <table className="table">
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
            <td className="col-md-2"><input type="date" className="form-control" ref="clearStartDate" id="clearStartDate" onChange={this.createdAtDate} /></td>
            <td className="col-md-2"><input className="form-control eventHead" ref="clearText" id="clearText" onChange={this.onEventLinkChange} /></td>
            <td className="col-md-2"><input className="form-control" ref="clearText1" id="clearText1" onChange={this.onEventNameChange} /></td>
            <td className="col-md-2">
            <select className="form-control" ref="clearSelect" id="clearSelect" onChange={this.onTypeChange} >
              <option hidden>Please select</option>
              <option>high</option>
              <option>medium</option>
              <option>low</option>
            </select>
            </td>
            <td className="col-md-2"><button className="btn btn-primary" onClick={this.onClickSave} value="save" disabled={this.state.invalidData}>Add Training</button></td>
          </tr>
          {mandatorytrainings.map(this.mandatorytrainingsRow)}
        </tbody>
      </table>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    mandatorytrainings: state.mandatorytrainings
  };
}

export default connect(mapStateToProps, mandatorytrainingActions)(TrainingsPage);
