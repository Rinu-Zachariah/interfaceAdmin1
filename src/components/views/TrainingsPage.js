import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as mandatorytrainingActions from '../../actions/mandatorytrainingActions';

class TrainingsPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      mandatorytrainings: {created_at: {},
      link: '',
      name: '',
      priority: ''
      }
    };
  }

  mandatorytrainingsRow(event,index){
    return(
      <tr key={index}>
        <td>{event.created_at.split("T")[0]}</td>
        <td>{event.link}</td>
        <td>{event.name}</td>
        <td>{event.priority}</td>
        <td><button className="btn btn-danger">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
  }

  render(){
    return (
      <div>
        <h1>Trainings</h1>
        {this.props.mandatorytrainings.map(this.mandatorytrainingsRow)}
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log("inside mandatorytrainings");
  console.log(state.mandatorytrainings);
  return {
    mandatorytrainings: state.mandatorytrainings
  };
}

export default connect(mapStateToProps)(TrainingsPage);
