import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import {connect} from 'react-redux';
import * as quicklinksActions from '../../actions/quicklinksActions';
import env from '../../environment';
import init from '../../../tools/init';
import dropZoneStyles from '../../css/dropzone.css';

 class DropZone extends Component{
    constructor(props) {
        super(props);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onSectionHeader = this.onSectionHeader.bind(this);
        this.onClickSave = this.onClickSave.bind(this);


        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
          //accepted files doen't work with zip folder. If u remove this it works perfectly; added new features for applications if restricted needs to b given
            //acceptedFiles: "image/jpeg,image/png,image/gif,application/pdf,application/zip,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/excel,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/x-rar-compressed, application/x-rar, application/octet-stream,application/zip, compressed/rar,application/rar,application/x-compressed,multipart/x-zip,multipart/x-rar",
            addRemoveLinks: true,
            params: {
                myParam: 'Hello from a parameter!',
                anotherParam: 43

            }
        };

        this.componentConfig = {
            iconFiletypes: ['.pdf', '.zip', '.ppt'],
            showFiletypeIcon: true,
            postUrl: env[init.env()].upload
        };
        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
      //  this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (data) => {
          let url = "modules\\main\\dlc\\Induction_Material\\"+data.name;
          const quicklinks = this.state.quicklinks;
          quicklinks.docpath = url;
          this.setState({quicklinks: quicklinks});
        };

        this.state = {
          quicklinks: {docpath: '',
          label: '' ,
          section_header: ''
          },
          invalidData: true
        };
    }

    componentWillUpdate(nextProps, nextState) {
      nextState.invalidData = !(nextState.quicklinks.label && nextState.quicklinks.section_header);
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
      const clearText = this.refs.clearText;
      const clearSelect = this.refs.clearSelect;
      $.ajax({
        type: "POST",
        url: env[init.env()].quicklinks,
        data: this.state.quicklinks,
        success: function(data){
          propObject.dispatch(quicklinksActions.createQuicklinks(data));
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
          <td className="dropHead"><DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/> </td>
          <td><input ref="clearText" id="clearText" className="form-control" onChange={this.onLabelChange} value={this.state.quicklinks.label}/></td>
          <td>
            <select className="form-control" ref="clearSelect" id="clearSelect" onChange={this.onSectionHeader}  value={this.state.quicklinks.section_header}>
              <option hidden>Please select</option>
              <option>ODC INDUCTION</option>
              <option>AGILE INDUCTION</option>
              <option>DOMAIN COE</option>
            </select>
          </td>
          <td><button className="btn btn-primary" onClick={this.onClickSave} value="save" disabled={this.state.invalidData}>Add Event</button></td>
          </tr>
        );

    }
}

function mapStateToProps(state,ownProps){
  return {
    quicklinks:state.quicklinks
  };
}
export default connect(mapStateToProps)(DropZone);
