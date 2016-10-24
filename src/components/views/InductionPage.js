import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropZone from './DropZone.js';
import * as quicklinksActions from '../../actions/quicklinksActions';

class InductionPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.onDocPath = this.onDocPath.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onSectionHeader = this.onSectionHeader.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.inductionRow = this.inductionRow.bind(this);
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
      url: 'http://localhost:4000/quicklinks',
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
      url: 'http://localhost:4000/quicklinks',
      type: "DELETE",
      data: quicklinks,
      success: function(data){
        console.log(data);
      }
    });
    this.props.dispatch(quicklinksActions.deleteQuicklinks(quicklinks))
  }


  inductionRow(event,index){
    return(
      <tr key={index}>
        <td>{event.docpath}</td>
        <td>{event.label}</td>
        <td>{event.section_header}</td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteEvent(event)}} value="delete">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
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
          <tr>
            <td><DropZone /></td>
            <td><input className="form-control" onChange={this.onLabelChange} value={this.state.quicklinks.label}/></td>
            <td><input className="form-control" onChange={this.onSectionHeader} value={this.state.quicklinks.section_header}/></td>
            <td><button className="btn btn-primary" onClick={this.onClickSave} value="save">Add Event</button></td>
          </tr>
          {this.props.quicklinks.map(this.inductionRow)}
        </tbody>
      </table>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log("inside induction");
  console.log(state.quicklinks);
  return {
    quicklinks: state.quicklinks
  };
}

export default connect(mapStateToProps)(InductionPage);
