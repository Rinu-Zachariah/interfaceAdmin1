import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import {connect} from 'react-redux';
import * as quicklinksActions from '../../actions/quicklinksActions';
import env from '../../environment';
import init from '../../../tools/init';

 class DropZone extends Component{
    constructor(props) {
        super(props);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onSectionHeader = this.onSectionHeader.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            acceptedFiles: "image/jpeg,image/png,image/gif,application/pdf,application/zip",
            addRemoveLinks: true,
            params: {
                myParam: 'Hello from a parameter!',
                anotherParam: 43

            }
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif', '.pdf', '.zip'],
            showFiletypeIcon: true,
            postUrl: env[init.env()].upload
        };
        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
      //  this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (data) => {
          let url = "modules/main/dlc/Induction_Material/"+data.name;
          console.log(data);
          console.log(url);
          const quicklinks = this.state.quicklinks;
          quicklinks.docpath = url;
          this.setState({quicklinks: quicklinks});
        }

        this.state = {
          quicklinks: {docpath: '',
          label: '' ,
          section_header: ''
          }
        };
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

      console.log(this.state.quicklinks);
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




    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            drop: this.callbackArray,
            addedfile: this.callback,
        }
        //console.log(eventHandlers);
        //return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}  />
        return (
          <tr>
          <td><DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/> </td>
          <td><input className="form-control" onChange={this.onLabelChange} value={this.state.quicklinks.label}/></td>
          <td><input className="form-control" onChange={this.onSectionHeader} value={this.state.quicklinks.section_header}/></td>
          <td><button className="btn btn-primary" onClick={this.onClickSave} value="save">Add Event</button></td>
          </tr>
        )

    }
}

function mapStateToProps(state,ownProps){
  return {
    quicklinks:state.quicklinks
  };
}
export default connect(mapStateToProps)(DropZone);
