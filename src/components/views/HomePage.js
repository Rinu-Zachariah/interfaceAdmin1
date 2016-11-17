import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from './DatePicker.js';
import moment from 'moment';
import momentRange from 'moment-range';

class HomePage extends Component{
  constructor(props, context){
    super(props, context);
    this.logRow = this.logRow.bind(this);
    this.getRange = this.getRange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state={
      log:{
        username: '',
        fmno:0,
        created_at:'',
        startDate: '',
        endDate: '',
      },
        showDatePicker:false
    };
  }

  getRange(range){
    const log = this.state.log;
    log.startDate = range.start._d;
    log.endDate = range.end._d;
    this.setState({log : log});
  }

  onClick(){
    if(this.state.showDatePicker === false){
      this.setState({showDatePicker:true});
    }
    else {
      this.setState({showDatePicker:false});
    }
  }

  logRow(log,index){
    const yesterday = moment().subtract(1,'days').format('L');
    const created_at = moment(log.created_at).format('L');
    if(!this.state.log.startDate){
      if(created_at >= yesterday){
        while(index>=0){
          return(
            <tr key={index}>
              <td>{log.username}</td>
              <td>{log.fmno}</td>
              <td>{moment(log.created_at).format('lll')}</td>
              <td><button className="btn btn-danger">Remove</button></td>
            </tr>
          );
        }
      }
    }
    else {
      const startDate = moment(this.state.log.startDate).format('L');
      const endDate = moment(this.state.log.endDate).format('L');
      if(created_at >= startDate && created_at <= endDate){
        return(
          <tr key={index}>
            <td>{log.username}</td>
            <td>{log.fmno}</td>
            <td>{moment(log.created_at).format('lll')}</td>
            <td><button className="btn btn-danger">Remove</button></td>
          </tr>
        );
      }
    }
  }

  render(){
    return (
      <div>
        <h1>Home</h1>
        <p>Total Number of users: <strong>{this.props.logs.length}</strong></p>
        <button className="btn btn-primary" onClick={this.onClick}>Show Calendar</button><br/>
        { this.state.showDatePicker ? <DatePicker getRange={this.getRange} minimumDate = {this.props.logs[this.props.logs.length-1]} /> : null }
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
