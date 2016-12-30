import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as successActions from '../../actions/successActions';
import SuccessAccordion from './SuccessAccordion.js';
import env from '../../environment';
import init from '../../../tools/init';
import ComingSoonImg from '../../images/wip.png';
import Timeline from './Timeline.js';

class SuccessStories extends Component{
  constructor(props, context) {
  //  alert ('hi0');
    super(props, context);
    console.log(this.props.successstories);
    this.successRow = this.successRow.bind(this);
  //  this.state = {

    //};
  }
  
  componentDidMount() {
    const propObject = this.props;
    $.get(env[init.env()].successstories, function(data){
      console.log("Inside ss");
      console.log(data);
      propObject.getStory(data);
    });
  }

  successRow(successstory,index){
    return (
      <div key={index}>
      <SuccessAccordion successstory1={successstory} by={successstory.by} title={successstory.title} createddate={successstory.created_at} updateddate={successstory.updated_at} abstract={successstory.content} problem={successstory.problem} approach={successstory.approach} impact={successstory.impact} successdate={successstory.successdate}/>
      </div>
);
  }

  render(){
    //alert('hi1');
    return (
      <div>
      <h2>SUCCESS STORIES</h2>
      {this.props.successstories.map(this.successRow)}
      </div>
    );
  }
}


  function mapStateToProps(state, ownProps){
  //  alert(state.successstories);
    //alert(successstories);
    return{
      successstories: state.successstories
    };

  }


export default connect(mapStateToProps, successActions)(SuccessStories);
