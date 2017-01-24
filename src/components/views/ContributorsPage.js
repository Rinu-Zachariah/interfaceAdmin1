import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContributorDropZone from './ContributorDropZone.js';
import _ from 'underscore';
import * as contributorActions from '../../actions/contributorActions';
import env from '../../environment';
import init from '../../../tools/init';
let singleFieldEdit = true;
import Center from 'react-center';
import dropZoneStyles from '../../css/dropzone.css';
import DropzoneComponent from 'react-dropzone-component';
import $ from 'jquery';

class ContributorsPage extends Component{



  constructor(props, context) {

super(props, context);
    this.djsConfig = {
      //accepted files doen't work with zip folder. If u remove this it works perfectly; added new features for applications if restricted needs to b given
        //acceptedFiles: "image/jpeg,image/png,image/gif,application/pdf,application/zip,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/excel,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/x-rar-compressed, application/x-rar, application/octet-stream,application/zip, compressed/rar,application/rar,application/x-compressed,multipart/x-zip,multipart/x-rar",
        acceptedFiles: "image/jpeg,image/png,image/gif",
        addRemoveLinks: true,
        params: {
            myParam: 'Hello from a parameter!',
            anotherParam: 43

        }
    };

    this.componentConfig = {
        iconFiletypes: ['.gif', '.jpg', '.jpeg','.png'],
        showFiletypeIcon: true,
        postUrl: env[init.env()].contriupload
    };

    this.callback = (data) => {
      let url = "modules/main/img/profile/"+data.name;
      const contributors = this.state.contributors;
      contributors.imagePath = url;
      this.setState({contributors: contributors});
    };

    this.onDeleteContributor = this.onDeleteContributor.bind(this);
    this.contriRow = this.contriRow.bind(this);
    this.onEditContri = this.onEditContri.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.state={

      contributors:{
        userDescription:'',
        imagePath:'',
        username:''
      }
    };

  }


  onUserNameChange (contri){
    const contributors = this.state.contributors;
    contributors.username = contri.target.value;
    this.setState({contributors: contributors});
  }

  onUserDescriptionChange  (contri){
    const contributors = this.state.contributors;
    contributors.userDescription = contri.target.value;
    this.setState({contributors: contributors});
  }

  onClickEditSave(index){
    const contributor = this.state.contributors;
    contributor._id = index;
    const propObject = this.props;
    singleFieldEdit = true;
    $.ajax({
      type: "PUT",
      url: env[init.env()].contributors,
      data: contributor,
      success: function(data){
        propObject.editContributor(data);

      },
      error: function(data){
        alert('error');
      }
    });
  }



    onDeleteContributor(eventObject){
    $.ajax({
    url: env[init.env()].contributors,
    type: "DELETE",
    data: eventObject,
    success: function(data){
    }
  });
    this.props.deleteContributors(eventObject);
  }

  onEditContri(contri){

    if (singleFieldEdit){
      const contributors = this.state.contributors;
      contributors.userDescription = contri.userDescription;
      contributors.username = contri.username;
      contributors.imagePath = contri.imagePath;

      this.setState({contributors: contributors});
      singleFieldEdit = false;
      console.log(contri);
      this.props.isEditingContributors(contri);
    }
    else {
      alert('Please Finish Editing One Module');
    }

  }

  contriRow(contributor,index){

    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
        drop: this.callbackArray,
        addedfile: this.callback
    };

    if(contributor.isEditing)
    {
      return(
        <tr key={index} className="table-row">
          <td className="table-cell"><input className="form-control eventHead"  onChange={this.onUserNameChange} value={this.state.contributors.username}/></td>

          <td className="table-cell">
          <select className="form-control" onChange={this.onUserDescriptionChange} value={this.state.contributors.userDescription}>
          <option hidden>Please select</option>
          <option>Product Manager</option>
          <option>Developer + UX</option>
          <option>Developer + DBA</option>
          <option>UI Developer</option>
          <option>Solution Architect</option>
          <option>Special Contribution</option>
          <option>Others</option>
          </select>
          </td>
		<td className="dropHead"><DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/> </td>
      <td><button className="btn btn-primary" onClick={()=>{this.onClickEditSave(contributor._id)}} id="save" value="save" disabled={this.state.invalidData}>Done</button></td>
        </tr>
      )
    }
      //console.log(contributor.imagePath);
      const imgPath = contributor.imagePath;
    //  console.log(imgPath);
      const srcPath = "http://localhost:4000/"+imgPath;
    //  console.log(srcPath);
    return(

      <tr key={index} className="table-row">
        <td className="table-cell">{contributor.username}</td>
        <td className="table-cell">{contributor.userDescription}</td>
      <td className="table-cell"><Center><img id="imagePath" ref="imagePath" src={srcPath} width="45px" height="45px"/></Center></td>
      
        <td><button className="btn btn-warning"  onClick={()=>{this.onEditContri(contributor)}}>Edit</button></td>
        <td><button className="btn btn-danger" onClick={()=>{this.onDeleteContributor(contributor)}} value="delete">Remove</button></td>
      </tr>
    );
  }

  render(){
    //console.log(this.props.contributors);

    return (

      <div className="table-responsive">
	    <h1>Contributors</h1>
      <table className="table table-responsive table-sm">
        <thead>
          <tr>
            <th>Name</th>
			      <th>Role</th>
			      <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <ContributorDropZone/>
         {this.props.contributors.map(this.contriRow)}
        </tbody>
      </table>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    contributors: state.contributors
	};
}

export default connect(mapStateToProps, contributorActions)(ContributorsPage);
