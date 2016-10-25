import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import * as PollActions from '../../actions/PollActions';
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

class Accordion extends React.Component {

  constructor() {
  super();
  this.state = {
    active: false
  };
  this.toggle = this.toggle.bind(this);
  }

    toggle() {
      this.setState({
        active: !this.state.active
      });
    }

    onDelete(menuObject){
      console.log(menuObject);
      $.ajax({
        url: env[init.env()].polls,
        type: 'DELETE',
        data: menuObject,
        success: function(data){
          console.log(data);
        }
      });
      this.props.dispatch(PollActions.deletePolls(menuObject));
    }

  render(){
  const stateStyle = this.state.active ? styles.active : styles.inactive;
  return (
        <section className="accordionContainer">
          <div className="heading">
            <a onClick={this.toggle}>
              {this.props.year}
            </a>
          </div>
          <div style={stateStyle} className="mainContent">
            <p dangerouslySetInnerHTML={{__html: this.props.summary}} />
            <ul>{this.props.data}</ul>
            <button className="btn btn-danger pull-right" onClick={()=>{this.onDelete(this.props.event1);}} value="delete">Remove</button>
            <button className="btn btn-warning pull-right">Edit</button>
          </div>
        </section>
      );
  }

}

Accordion.propTypes ={
  summary: React.PropTypes.string,
  year: React.PropTypes.string,
  data: React.PropTypes.array,
  event1:React.PropTypes.object
};

function mapStateToProps(state,ownProps){
  console.log("inside accordion page");
  console.log(state.poll);
  return {
    poll:state.poll
  };
}

export default connect(mapStateToProps)(Accordion);
