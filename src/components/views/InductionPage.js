import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as quicklinksActions from '../../actions/quicklinksActions';

class InductionPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      quicklinks: {docpath: '',
      label: '' ,
      section_header: '',
      type: ''
      }
    };
  }

  inductionRow(event,index){
    return(
      <tr key={index}>
        <td>{event.docpath}</td>
        <td>{event.label}</td>
        <td>{event.section_header}</td>
        <td>{event.type}</td>
        <td><button className="btn btn-danger">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
  }

  render(){
    return (
      <div>
        <h1>Induction</h1>
        {this.props.quicklinks.map(this.inductionRow)}
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
