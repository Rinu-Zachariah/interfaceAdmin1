import React, {Component} from 'react';
import {connect} from 'react-redux';

class HomePage extends Component{
  constructor(props, context){
    super(props, context);
    this.logRow = this.logRow.bind(this);
    this.state={
      log:{
        username: '',
        fmno:0,
        created_at:''
      }
    };
  }




  logRow(event,index){
    return(
      <tr key={index}>
        <td>{event.username}</td>
        <td>{event.fmno}</td>
        <td>{event.created_at.split("T")[0]}</td>
        <td><button className="btn btn-danger">Remove</button></td>
      </tr>
    );
  }

  render(){
    return (
      <div>
        <h1>Home</h1>
        <p>Total Number of users: <strong>{this.props.logs.length}</strong></p>

        <table style={{textAlign:"left"}} className="table table-striped">
          <thead>
            <tr>
              <th>User Name</th>
              <th>FMNO</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {this.props.logs.map(this.logRow)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    logs: state.logs
  };
}

export default connect(mapStateToProps)(HomePage);
