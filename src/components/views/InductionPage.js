import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as quicklinksActions from '../../actions/quicklinksActions';

class InductionPage extends Component{
  render(){
    return (
      <div>
        <h1>Induction</h1>
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
