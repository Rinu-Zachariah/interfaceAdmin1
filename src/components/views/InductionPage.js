import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropZone from './DropZone.js';
import _ from 'underscore';
import * as quicklinksActions from '../../actions/quicklinksActions';
import env from '../../environment';
import init from '../../../tools/init';
let singleFieldEdit = true;

class InductionPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.onDocPath = this.onDocPath.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onSectionHeader = this.onSectionHeader.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.inductionRow = this.inductionRow.bind(this);
    this.onEditEvent = this.onEditEvent.bind(this);
    this.onClickEditSave = this.onClickEditSave.bind(this);
    this.state = {
      quicklinks: {docpath: '',
      label: '' ,
      section_header: ''
      }
    };
  }

  onDocPath(event){
    const quicklinks = this.state.quicklinks;
    quicklinks.docpath = event.target.value;
    this.setState({quicklinks: quicklinks});
    console.log(this.state.quicklinks);
  }

  onLabelChange(event){
    const quicklinks = this.state.quicklinks;
    quicklinks.label = event.target.value;
    this.setState({quicklinks: quicklinks});
  }

  onSectionHeader(event){
    const quicklinks = this.state.quicklinks;
    quicklinks.section_header = event.target.value;
    this.setState({quicklinks: quicklinks});
  }

  onClickSave(){
    const propObject = this.props;
    $.ajax({
      type: "POST",
      url: env[init.env()].quicklinks,
      data: this.state.quicklinks,
      success: function(data){
        console.log(data);
        propObject.dispatch(quicklinksActions.createQuicklinks(data));
      },
      error: function(data){
        console.log(data);
        alert('error');
      }
    });

  }

  onDeleteEvent(quicklinks){
    console.log(quicklinks);
    $.ajax({
      url: env[init.env()].quicklinks,
      type: "DELETE",
      data: quicklinks,
      success: function(data){
        console.log(data);
      }
    });
    this.props.dispatch(quicklinksActions.deleteQuicklinks(quicklinks))
  }

  onEditEvent(eventObject){
    if (singleFieldEdit){
      const quicklinks = this.state.quicklinks;
      quicklinks.docpath = eventObject.docpath;
      quicklinks.label = eventObject.label;
      quicklinks.section_header = eventObject.section_header;

      this.setState({quicklinks: quicklinks});
      singleFieldEdit = false;
      this.props.dispatch(quicklinksActions.isEditingQuicklinks(eventObject));
    }
    else {
      alert('Please Finish Editing One Module');
    }

  }

  onClickEditSave(index){
    const quicklink = this.state.quicklinks;
    quicklink._id = index;
    const quicklinks = {docpath: '',
    label: '' ,
    section_header: ''
    }
    this.setState({quicklinks: quicklinks});
    const propObject = this.props;
    singleFieldEdit = true;
    $.ajax({
      type: "PUT",
      url: env[init.env()].quicklinks,
      data: quicklink,
      success: function(data){
        propObject.dispatch(quicklinksActions.editQuicklinks(data));
      },
      error: function(data){
        alert('error');
      }
    });

  }

  inductionRow(event,index){
    if(event.isEditing)
    {
      return(
        <tr key={index}>
          <td><input className="form-control eventHead" onChange={this.onDocPath} value={this.state.quicklinks.docpath}/></td>
          <td><input className="form-control" onChange={this.onLabelChange} value={this.state.quicklinks.label}/></td>
          <td>
            <select className="form-control" onChange={this.onSectionHeader} value={this.state.quicklinks.section_header}>
              <option hidden>Please select</option>
              <option>ODC INDUCTION</option>
              <option>AGILE INDUCTION</option>
              <option>DOMAIN COE</option>
            </select>
          </td>
          <td><button className="btn btn-primary" onClick={()=>{this.onClickEditSave(event._id)}} id="save" value="save" disabled={this.state.invalidData}>Done</button></td>
        </tr>
      )
    }
    return(
      <tr key={index}>
        <td className="docPath">{event.docpath}</td>
        <td>{event.label}</td>
        <td>{event.section_header}</td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteEvent(event)}} value="delete">Remove</button></td>
        <td><button className="btn btn-warning" onClick={()=>{this.onEditEvent(event)}}>Edit</button></td>
      </tr>
    );
  }

  render(){
    return (
      <div>
      <h2>INDUCTION</h2>
      <table style={{textAlign:"left"}}className="table">
        <thead>
          <tr>
            <th>DocPath</th>
            <th>Label</th>
            <th>Section Header</th>
          </tr>
        </thead>
        <tbody>
          <DropZone/>
          {this.props.quicklinks.map(this.inductionRow)}
        </tbody>
      </table>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    quicklinks: state.quicklinks
  };
}

export default connect(mapStateToProps)(InductionPage);
