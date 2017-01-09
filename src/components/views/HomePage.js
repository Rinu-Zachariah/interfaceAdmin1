import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from './DatePicker.js';
import * as logsActions from '../../actions/logActions';
import env from '../../environment';
import init from '../../../tools/init';
import _ from 'underscore';
import moment from 'moment';
import momentRange from 'moment-range';
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';

let logData = [];
let logLabel = [];

class HomePage extends Component{
  constructor(props, context){
    super(props, context);
    this.logRow = this.logRow.bind(this);
    this.getRange = this.getRange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getGraph = this.getGraph.bind(this);
    this.state={
      log:{
        username: '',
        fmno:0,
        created_at:'',
        startDate: '',
        endDate: '',
      },
        showDatePicker:false,
        data:{}
    };
  }

  componentDidMount(){
    this.getGraph();

  }

  getRange(range){
    const log = this.state.log;
    log.startDate = range.start._d;
    log.endDate = range.end._d;
    this.setState({log : log});
    this.getGraph();
  }

  onClick(){
    if(this.state.showDatePicker === false){
      this.setState({showDatePicker:true});
    }
    else {
      this.setState({showDatePicker:false});
    }
  }

  getGraph(){
    logData.length = 0;
    logLabel.length = 0;
    let week = moment().subtract(7,'days').format('L');
    let count = 1;
    let dcount = 0;
    for ( let i = this.props.logs.length-1; i > 0; i--) {
      const created_at = moment(this.props.logs[i].created_at).format('L');
      if(!this.state.log.startDate){
        if(i>0){
          let prevdate = moment(this.props.logs[i-1].created_at).format('L');
          if(moment(created_at).isAfter(week,'day')){
            let newdate = moment(created_at);
            if(moment(prevdate).isSame(newdate)){
              count++;
            }
            else{
              logData.push(count);
              logLabel.push(created_at);
              count = 1;
            }
          }
        }
        else{
          let nextdate = moment(this.props.logs[1].created_at).format('L');
          if(moment(created_at).isSame(nextdate)){
            count++;
          }
          else{
            logData.push(count);
            logLabel.push(created_at);
            count = 1;
          }
        }

      }
      else{
        const startDate = moment(this.state.log.startDate).format('L');
        const endDate = moment(this.state.log.endDate).format('L');
        let elsedate = moment(startDate).subtract(1,'days').format('L');
        if(moment(created_at).isAfter(startDate) && moment(created_at).isBefore(endDate)){
          if(i>0){
            let prevdate = moment(this.props.logs[i-1].created_at).format('L');
            if(moment(created_at).isSame(prevdate)){
              count++;
            }
            else {
              logData.push(count);
              logLabel.push(prevdate);
              count = 1;
            }
          }
        }
        else if(elsedate && dcount === 0){
          const value = moment(this.props.logs[i-1].created_at).format('L');
          logData.push(count);
          logLabel.push(value);
          dcount++;
        }
      }
    }

    const data = {
    labels: logLabel,
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: logData
      }
    ]
  };
    console.log(logData);
    let ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: Chart.defaults.global.elements.line
});
  }

  logRow(log,index){
    const yesterday = moment().subtract(7,'days').format('L');
    const created_at = moment(log.created_at).format('L');
    if(!this.state.log.startDate){
      if(moment(created_at).isAfter(yesterday)){
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
      if(moment(created_at).isAfter(startDate) && moment(created_at).isBefore(endDate)){
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
    let unique = [...new Set(this.props.logs.map(item => item.fmno))];
    return (
      <div>
        <h1>Home</h1>
        <p>Total Number of visits: <strong>{this.props.logs.length}</strong></p>
        <p>Total Number of unique visits: <strong>{unique.length}</strong></p>
        <button className="btn btn-primary" onClick={this.onClick}>Show Calendar</button>
        { this.state.showDatePicker ? <DatePicker getRange={this.getRange} minimumDate = {this.props.logs[this.props.logs.length-1]} /> : null }
        <canvas id="myChart" width="60%" height="20%"></canvas>
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
