import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as mandatorytrainingActions from '../../actions/mandatorytrainingActions';

class TrainingsPage extends Component{
  render(){
    return (
      <div>
        <h1>Trainings</h1>
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
