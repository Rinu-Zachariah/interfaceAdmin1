import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from './DatePicker.js';
import * as logsActions from '../../actions/logActions';
import env from '../../environment';
import init from '../../../tools/init';
import moment from 'moment';
import momentRange from 'moment-range';
import FusionCharts from 'fusioncharts';
import carbon from 'fusioncharts/themes/fusioncharts.theme.carbon.js';
import fint from 'fusioncharts/themes/fusioncharts.theme.fint.js';
import ocean from 'fusioncharts/themes/fusioncharts.theme.ocean.js';
import zune from 'fusioncharts/themes/fusioncharts.theme.zune.js';
require("fusioncharts/fusioncharts.charts")(FusionCharts);

let logData = [];

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
        showDatePicker:false
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
    let week = moment().subtract(7,'days').format('L');
    let count = 1;
    let dcount = 0;
    for ( var i = 0; i < this.props.logs.length; i++) {
      const created_at = moment(this.props.logs[i].created_at).format('L');
      if(!this.state.log.startDate){
        if(i>0){
          let prevdate = moment(this.props.logs[i-1].created_at).format('L');
          if(created_at >= week){
            let newdate = created_at;
            if(prevdate === newdate){
              count++;
            }
            else{
              logData.push({
                "label":created_at,
                "value":count
              })
              count = 1;
            }
          }
        }
        else{
          let nextdate = moment(this.props.logs[1].created_at).format('L');
          if(created_at === nextdate){
            count++;
          }
          else{
            logData.push({
              "label":created_at,
              "value":count
            })
            count = 1;
          }
        }

      }
      else{
        const startDate = moment(this.state.log.startDate).format('L');
        const endDate = moment(this.state.log.endDate).format('L');
        let elsedate = moment(startDate).subtract(1,'days').format('L');
        if(created_at >= startDate && created_at <= endDate){
          if(i>0){
            let prevdate = moment(this.props.logs[i-1].created_at).format('L');
            if(prevdate === created_at){
              count++;
            }
            else {
              logData.push({
                "label":prevdate,
                "value":count
              })
              count = 1;
            }
          }
        }
        else if(elsedate && dcount === 0){
          logData.push({
            "label":moment(this.props.logs[i-1].created_at).format('L'),
            "value":count
          })
          dcount++;
        }
      }
    }
    FusionCharts.ready(function() {
    let fusioncharts = new FusionCharts({
        type: 'line',
        renderAt: 'chart-container',
        width: '500',
        height: '300',
        dataFormat: "json",
        dataSource:{
          "chart":{
            caption: "Logged User Analysis",
            subCaption: "Rangewise",
            xAxisName: "Date",
            yAxisName: "Number of logged users",
            palette: "5",
            theme: "zune",
            bgColor: "#eeeeee",
            canvasbgColor: "#1790e1",
            canvasbgAlpha: "10",
            showCanvasBorder: "1",
            canvasBorderColor: "#666666",
            canvasBorderThickness: "4",
            canvasBorderAlpha: "80",
          },
          "data":logData
        }
    });
    fusioncharts.render();
  });
  }

  logRow(log,index){
    const yesterday = moment().subtract(7,'days').format('L');
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
        <p>Total Number of visits: <strong>{this.props.logs.length}</strong></p>
        <button className="btn btn-primary" onClick={this.onClick}>Show Calendar</button>
        { this.state.showDatePicker ? <DatePicker getRange={this.getRange} minimumDate = {this.props.logs[this.props.logs.length-1]} /> : null }
        <div id="chart-container">FusionCharts XT will load here!</div>
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
