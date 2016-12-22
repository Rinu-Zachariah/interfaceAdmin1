import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as adminActions from '../../actions/adminActions';
import env from '../../environment';
import init from '../../../tools/init';
import ComingSoonImg from '../../images/wip.png';

let singleFieldEdit = true;

class AdminPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      admins:{
        name: '',
        fmno: ''
      },
      searchString: ''
    };
    this.AdminRow = this.AdminRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onFmnoChange = this.onFmnoChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onDeleteAdmin = this.onDeleteAdmin.bind(this);

  }
  componentDidMount() {
    const propObject = this.props;
    $.get(env[init.env()].admins, function(data){
      propObject.getAdmin(data);
    });
  }

  onNameChange(event){
    const admins = this.state.admins;
    admins.name = event.target.value;
    this.setState({admins: admins});
  }

  onFmnoChange(event){
    const admins = this.state.admins;
    admins.fmno = event.target.value;
    this.setState({admins: admins});
  }

  onClickSave(){
    const propObject = this.props;
    const clearName = this.refs.clearName;
    const clearFmno = this.refs.clearFmno;
    console.log(this.state.admins)
    $.ajax({
      type: "POST",
      url: env[init.env()].admins,
      data: this.state.admins,
      success: function(data){
        propObject.createAdmin(data);
        clearName.value = "";
        clearFmno.value = "";
      },
      error: function(data){
        alert('error');
      }
    });
  }

  onDeleteAdmin(adminObject){
    $.ajax({
    url: env[init.env()].admins,
    type: "DELETE",
    data: adminObject,
    success: function(data){
    }
  });
    this.props.deleteAdmin(adminObject);
  }

  AdminRow(admin,index){
    return(
      <tr key={index} className="table-row">
        <td className="table-cell">{admin.name}</td>
        <td className="table-cell">{admin.fmno}</td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteAdmin(admin)}} value="delete">Remove</button></td>
      </tr>
    );
  }

  handleChange(event){
    this.setState({searchString: event.target.value});
  }

  render(){
      let admins = this.props.admins;
      if(this.state.searchString.length > 0){
          let searchString = this.state.searchString.trim().toLowerCase();
          admins = admins.filter(function(l){
               return(l.name.toLowerCase().match(searchString) || l.fmno.toLowerCase().match(searchString));
          });

      }
    return (
      <div>
        <div className="row">
          <div className="col-md-5"><h2>ADMINS</h2></div>
          <div className="col-md-7"><input type="text" className="form-control" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" /></div>
        </div>
        <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr className="table-row">
              <th>Name</th>
              <th>FMNO</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-cell"><input className="form-control eventHead" ref="clearName" id="clearName" onChange={this.onNameChange} /></td>
              <td className="table-cell"><input type="number" className="form-control" ref="clearFmno" id="clearFmno" onChange={this.onFmnoChange} /></td>
              <td className="table-cell"><button className="btn btn-primary" onClick={this.onClickSave} id="save" value="save" disabled={this.state.invalidData}>Add Event</button></td>
            </tr>
            {admins.map(this.AdminRow)}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    admins: state.admins
  }
}

export default connect(mapStateToProps, adminActions)(AdminPage);
