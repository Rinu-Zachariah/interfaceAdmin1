import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as eventsActions from '../../actions/eventsActions';
import $ from 'jquery';
import env from '../../environment';
import init from '../../../tools/init';
import ComingSoonImg from '../../images/wip.png';

class ContributorsPage extends Component{
  constructor(props, context){
    super(props, context);
    this.state={
      contributors:{

      }
    };
  }

  render(){
    return (
    <div>
      <h1>Contributors</h1>
      <center><br/>
      <img src={ComingSoonImg} /><br/><br/>
      <span className="sub-heading-small">Page coming soon! Stay Tuned!</span>
      </center>
    </div>
    );
  }
}

export default ContributorsPage;
