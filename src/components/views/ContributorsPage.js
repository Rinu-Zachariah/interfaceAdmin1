import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as eventsActions from '../../actions/eventsActions';
import $ from 'jquery';

class ContributorsPage extends Component{
  constructor(props, context){
    super(props, context);
    this.state={
      contributors:{
        
      }
    }
  }

  render(){
    return (
      <div>
        <h1>Contributors</h1>
      </div>
    );
  }
}

export default ContributorsPage;
