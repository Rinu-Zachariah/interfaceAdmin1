import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropZone from './DropZone.js';
import _ from 'underscore';
import * as quicklinksActions from '../../actions/quicklinksActions';
import env from '../../environment';
import init from '../../../tools/init';
let singleFieldEdit = true;
import pdf from '../../images/pdf.png';
import ppt from '../../images/pptx.png';
import zip from '../../images/zip.png';
import png from '../../images/png.png';
import xls from '../../images/xls.png';
import doc from '../../images/doc.png';
import moment from 'moment';
import FusionCharts from 'fusioncharts';
require("fusioncharts/fusioncharts.charts")(FusionCharts);

let downloadDocs = [];

class InductionPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.onDocPath = this.onDocPath.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onSectionHeader = this.onSectionHeader.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.inductionRow = this.inductionRow.bind(this);
    this.onEditEvent = this.onEditEvent.bind(this);
    this.onClickEditSave = this.onClickEditSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getGraph = this.getGraph.bind(this);
    this.state = {
      quicklinks: {
        docpath: '',
        label: '' ,
        section_header: ''
      },
      searchString: ''
    };
  }

  onDocPath(event){
    const quicklinks = this.state.quicklinks;
    quicklinks.docpath = event.target.value;
    this.setState({quicklinks: quicklinks});
  }

  onLabelChange(event){
    const quicklinks = this.state.quicklinks;
    quicklinks.label = event.target.value;
    this.setState({quicklinks: quicklinks});
  }

  onSectionHeader(event){
    const quicklinks = this.state.quicklinks;
    quicklinks.section_header = event.target.value;
    this.setState({quicklinks: quicklinks});
  }

  onClickSave(){
    const propObject = this.props;
    $.ajax({
      type: "POST",
      url: env[init.env()].quicklinks,
      data: this.state.quicklinks,
      success: function(data){
        console.log(data);
        propObject.dispatch(quicklinksActions.createQuicklinks(data));
      },
      error: function(data){
        console.log(data);
        alert('error');
      }
    });

  }

  onDeleteEvent(quicklinks){
    console.log(quicklinks);
    $.ajax({
      url: env[init.env()].quicklinks,
      type: "DELETE",
      data: quicklinks,
      success: function(data){
        console.log(data);
      }
    });
    this.props.dispatch(quicklinksActions.deleteQuicklinks(quicklinks))
  }

  onEditEvent(eventObject){
    if (singleFieldEdit){
      const quicklinks = this.state.quicklinks;
      quicklinks.docpath = eventObject.docpath;
      quicklinks.label = eventObject.label;
      quicklinks.section_header = eventObject.section_header;

      this.setState({quicklinks: quicklinks});
      singleFieldEdit = false;
      this.props.dispatch(quicklinksActions.isEditingQuicklinks(eventObject));
    }
    else {
      alert('Please Finish Editing One Module');
    }

  }


  onClickEditSave(index){
    const quicklink = this.state.quicklinks;
    quicklink._id = index;
    const quicklinks = {docpath: '',
    label: '' ,
    section_header: ''
    }
    this.setState({quicklinks: quicklinks});
    const propObject = this.props;
    singleFieldEdit = true;
    $.ajax({
      type: "PUT",
      url: env[init.env()].quicklinks,
      data: quicklink,
      success: function(data){
        propObject.dispatch(quicklinksActions.editQuicklinks(data));
      },
      error: function(data){
        alert('error');
      }
    });

  }

  handleChange(event){
    console.log(event.target.value);
   this.setState({searchString: event.target.value});
  }

  getGraph(category){
    downloadDocs.length = 0;
    let date = new Date();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    console.log(year);
    for ( var i = 0; i < this.props.quicklinks.length; i++) {
      let count = 0;
      let selectedCategory = this.props.quicklinks[i].section_header;
      if (category === selectedCategory ) {
        for (var j = 0; j < this.props.downloads.length; j++) {
          let label = this.props.quicklinks[i].label;
          let monthDownloads = moment(this.props.downloads[j].downloaded_at);
          let nmonth = monthDownloads.month()+1;
          let nyear = monthDownloads.year();
          console.log(nyear);
          if ((label === this.props.downloads[j].name) && (month === nmonth) && (year === nyear)) {
            count++;
          }
        }
        downloadDocs.push({
          "label":this.props.quicklinks[i].label,
          "value":count
        })
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
              caption: "Categorywise Document Distribution",
              subCaption: "Monthly downloads",
              xAxisName: "Name of Documents",
              yAxisName: "Number of Downloads",
              theme: "ocean"
            },
            "data":downloadDocs
          }
      });
      fusioncharts.render();
    });
  }

  inductionRow(event,index){
    const obj={};
    const extn = event.docpath.split('.').pop();
    if(extn == "pdf"){
      obj.src=pdf;
    }
    else if (extn == "ppt" || extn == "pptx") {
      obj.src=ppt;
    }
    else if (extn == "doc" || extn == "docx") {
      obj.src=doc;
    }
    else if (extn == "xls" || extn == "xlsx") {
      obj.src=xls;
    }
    else if (extn == "png") {
      obj.src=png;
    }
    else if (extn == "zip") {
      obj.src=zip;
    }

    const filename = event.docpath.substring(event.docpath.lastIndexOf('/')+1);

    if(event.isEditing)
    {
      return(
        <tr key={index} className="table-row">
          <td className="table-cell"><input className="form-control eventHead" onChange={this.onDocPath} value={this.state.quicklinks.docpath}/></td>
          <td className="table-cell"><input className="form-control" onChange={this.onLabelChange} value={this.state.quicklinks.label}/></td>
          <td className="table-cell">
            <select className="form-control" onChange={this.onSectionHeader} value={this.state.quicklinks.section_header}>
              <option hidden>Please select</option>
              <option>ODC INDUCTION</option>
              <option>AGILE INDUCTION</option>
              <option>DOMAIN COE</option>
            </select>
          </td>
          <td className="table-cell"><button className="btn btn-primary" onClick={()=>{this.onClickEditSave(event._id)}} id="save" value="save" disabled={this.state.invalidData}>Done</button></td>
        </tr>
      )
    }
    return(
      <tr key={index}>
        <td className="docPath">{filename}</td>
        <td><img id="imagePath" ref="imagePath" src={obj.src} width="50px"/></td>
        <td>{event.label}</td>
        <td>{event.section_header}</td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteEvent(event)}} value="delete">Remove</button></td>
        <td><button className="btn btn-warning" onClick={()=>{this.onEditEvent(event)}}>Edit</button></td>
      </tr>
    );
  }

  render(){
    let quicklinks = this.props.quicklinks;
    let odcCount = 0;
    let agileCount = 0;
    let domainCount = 0;
    for (var i = 0; i < this.props.downloads.length; i++) {
      let category = this.props.downloads[i].category;
      if(category === 'ODC INDUCTION'){
        odcCount++;
      }
      else if (category === 'AGILE INDUCTION') {
        agileCount++;
      }
      else if (category === 'DOMAIN COE') {
        domainCount++;
      }
    }

    if(this.state.searchString.length > 0){

        let searchString = this.state.searchString.trim().toLowerCase();

        quicklinks = quicklinks.filter(function(l){
             let filename = l.docpath.substring(l.docpath.lastIndexOf('/')+1);
             return(l.label.toLowerCase().match(searchString) || l.section_header.toLowerCase().match(searchString) || filename.toLowerCase().match(searchString));

        });

    }

    return (
      <div>
      <div className="row">
        <div className="col-md-12"><h2>INDUCTION</h2></div>
        <div className="row">
           <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="info-box" onClick={()=>this.getGraph("ODC INDUCTION")}>
                <span className="info-box-icon bg-aqua"><i className="fa fa-2x fa-user-circle"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">ODC INDUCTION</span>
                  <span className="info-box-number">{odcCount}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="info-box" onClick={()=>this.getGraph("AGILE INDUCTION")}>
                <span className="info-box-icon bg-yellow"><i className="fa fa-2x fa-tasks"></i></span>

                <div className="info-box-content">
                  <span className="info-box-text">AGILE INDUCTION</span>
                  <span className="info-box-number">{agileCount}</span>
                </div>
              </div>
            </div>

            <div className="clearfix visible-sm-block"></div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="info-box" onClick={()=>this.getGraph("DOMAIN COE")}>
                <span className="info-box-icon bg-green"><i className="fa fa-2x fa-book"></i></span>

                <div className="info-box-content">
                  <span className="info-box-text">DOMAIN COE</span>
                  <span className="info-box-number">{domainCount}</span>
                </div>
              </div>
            </div>
        </div>
        <div id="chart-container">FusionCharts XT will load here!</div>
        <div className="col-md-offset-5 col-md-7"><input type="text" className="form-control" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" /></div>
      </div>
      <div className="table-responsive">
      <table className="table table-responsive table-sm">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Label</th>
            <th>Section Header</th>
          </tr>
        </thead>
        <tbody>
          <DropZone/>
          {quicklinks.map(this.inductionRow)}
        </tbody>
      </table>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    quicklinks: state.quicklinks,
    downloads: state.downloads
  };
}

export default connect(mapStateToProps)(InductionPage);
