import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as quicklinksActions from '../../actions/quicklinksActions';

class InductionPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      quicklinks: {docpath: '',
      label: '' ,
      section_header: ''
      }
    };
  }

  onClickSave(){
    const propObject = this.props;
    $.ajax({
      type: "POST",
      url: '',
      data: this.state.events,
      success: function(data){
        console.log(data);
        propObject.dispatch(quicklinksActions.createQuicklinks(data));
      },
      error: function(data){
        alert('error');
      }
    });

  }

  inductionRow(event,index){
    return(
      <tr key={index}>
        <td>{event.docpath}</td>
        <td>{event.label}</td>
        <td>{event.section_header}</td>
        <td><button className="btn btn-danger">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
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
            <td><input className="form-control"/></td>
            <td><input className="form-control"/></td>
            <td><input className="form-control"/></td>
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
