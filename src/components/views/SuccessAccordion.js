import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import * as successActions from '../../actions/successActions';
import env from '../../environment';
import init from '../../../tools/init';

const styles = {
  active: {
    display: 'inherit'
  },
  inactive:{
    display: 'none'
  }
};

class SuccessAccordion extends React.Component {

  constructor() {
  super();
  this.state = {
    active: false
  };
  this.toggle = this.toggle.bind(this);
  this.changeDateFormat = this.changeDateFormat.bind(this);
  }


changeDateFormat(date){
  var d = new Date(date);
  //alert(d);
  var day = d.getDate();
  //alert('day : '+day);
  var month = d.getMonth();
  //alert('month : '+month)
  var year = d.getFullYear();
  var successdt = day+'/'+month+'/'+year;
  return (successdt);
  //this.setState({successdt:day+'/'+month+'/'+year});
  //alert('year : '+year);
  //alert (day+month+year);
}
    toggle() {
      this.setState({
        active: !this.state.active
      });
    }

    onDelete(menuObject){
      $.ajax({
        url: env[init.env()].successstories,
        type: 'DELETE',
        data: menuObject,
        success: function(data){
          console.log(data);
        }
      });
      this.props.dispatch(successActions.deleteStory(menuObject));
    }

  render(){
    var successdate1 = this.props.successdate;
  //  alert(successdate1);
    var newdate = this.changeDateFormat(successdate1);
  const stateStyle = this.state.active ? styles.active : styles.inactive;
//  alert(this.props.abstract);
  return (

        <section className="accordionContainer">
          <div className="heading">
            <a onClick={this.toggle}>
              {this.props.title}
            </a>
          </div>
          <div style={stateStyle} className="mainContent">

            <span className="spanLeft">Success Date: {newdate}</span><span className="spanRight">By: {this.props.by}</span>
            <br/><br/>
            <ul>
            <li><b>Abstract</b></li><p>{this.props.abstract}</p>
            <li><b>Problem</b></li><p>{this.props.problem}</p>
            <li><b>Approach</b></li><p>{this.props.approach}</p>
            <li><b>Impact</b></li><p>{this.props.impact}</p>
            </ul>

            <button className="btn btn-danger pull-right" onClick={()=>{this.onDelete(this.props.successstory1);}} value="delete">Remove</button>
            <button className="btn btn-warning pull-right">Edit</button>
          </div>
        </section>
      );
  }

}

SuccessAccordion.propTypes ={
  content: React.PropTypes.string,
  year: React.PropTypes.string,
  data: React.PropTypes.array,
  successstory1:React.PropTypes.object
};


function mapStateToProps(state, ownProps){
  return{
    //successstories: state.successstories
  };

}
export default connect(mapStateToProps)(SuccessAccordion);
