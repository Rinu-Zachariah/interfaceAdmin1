import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import {connect} from 'react-redux';
import * as contributorActions from '../../actions/contributorActions';
import env from '../../environment';
import init from '../../../tools/init';
import dropZoneStyles from '../../css/dropzone.css';

 class ContributorDropZone extends Component{
    constructor(props) {
        super(props);
        this.onUsername = this.onUsername.bind(this);
        this.onUserDescriptionChange = this.onUserDescriptionChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);


        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
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
            postUrl: env[init.env()].contriupload,

        };
        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
      //  this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (data) => {
          let url = "modules/main/img/profile/"+data.name;
          const contributors = this.state.contributors;
          contributors.imagePath = url;
          this.setState({contributors: contributors});
        };

        this.state = {
          contributors: {imagePath: '',
          userDescription: '' ,
          username: ''
          }
        };
    }

    componentWillUpdate(nextProps, nextState) {
      nextState.invalidData = !(nextState.contributors.userDescription && nextState.contributors.username);
    }

    onUserDescriptionChange(event){
      const contributors = this.state.contributors;
      contributors.userDescription = event.target.value;
      this.setState({contributors: contributors});
    }

    onUsername(event){
      const contributors = this.state.contributors;
      contributors.username = event.target.value;
      this.setState({contributors: contributors});
    }

    onClickSave(){
      const propObject = this.props;
      const clearText = this.refs.clearText;
      const clearSelect = this.refs.clearSelect;
      console.log("inside save");

      $.ajax({
        type: "POST",
        url: env[init.env()].contributors,
        data: this.state.contributors,
        success: function(data){
          propObject.dispatch(contributorActions.createcontributors(data));
           clearText.value = "";
           clearSelect.value = "";
        },
        error: function(data){
          alert('error');
        }
      });

    }




    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            drop: this.callbackArray,
            addedfile: this.callback,
        };
        //console.log(eventHandlers);
        //return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}  />
        return (
          <tr>
          <td className="table-cell"><input className="form-control eventHead" ref="clearText" id="clearText" onChange={this.onUsername} value={this.state.contributors.username}/></td>
          <td>
          <select className="form-control" ref="clearSelect" id="clearSelect" onChange={this.onUserDescriptionChange} value={this.state.contributors.userDescription}>
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
          <td><button className="btn btn-primary" onClick={this.onClickSave} value="save" disabled={this.state.invalidData}>Add Contributor</button></td>
          </tr>
        );
    }
}

function mapStateToProps(state,ownProps){
  return {
    contributors:state.contributors
  };
}
export default connect(mapStateToProps)(ContributorDropZone);
