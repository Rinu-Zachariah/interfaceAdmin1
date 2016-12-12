import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as adminActions from '../../actions/adminActions';
import env from '../../environment';
import init from '../../../tools/init';
import ComingSoonImg from '../../images/wip.png';

class AdminPage extends Component{
  constructor(props, context) {
    console.log("inside constructor");
    super(props, context);
    this.AdminRow = this.AdminRow.bind(this);
    this.state = {
      admins:{
      }
    };
  }
  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props.dispatch(adminActions.getAdmin()));
  }

  AdminRow(admin,index){
    return(
      <tr key={index}>
        <td>{admin.fmno}</td>
        <td><button className="btn btn-danger">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    );
  }

  render(){
    console.log(this.props.admins);
    return (
      <div>
      <h2>ADMIN</h2>
      <center>
        <table>
        <thead>
          <tr>
            <th>FMNO</th>
          </tr>
        </thead>
        <tbody>
        {this.props.admins.map(this.AdminRow)}
        </tbody>
        </table>
      </center>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log("Inside admin");
  return {
    admins: state.admins
  };
}

export default connect(mapStateToProps)(AdminPage);
