import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import {connect} from 'react-redux';
import dropZoneStyles from '../../css/dropzone.css';

 export default class EventDrop extends Component{
    constructor(props) {
        super(props);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
          //  acceptedFiles: "image/jpeg,image/png,image/gif,application/pdf,application/zip",
            addRemoveLinks: true,
            params: {
                myParam: 'Hello from a parameter!',
                anotherParam: 43
            }
        };

        this.componentConfig = {
            iconFiletypes: ['.csv'],
            showFiletypeIcon: true,
            postUrl: 'http://localhost:4000/uploadEvent'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
      //  this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (data) => {
          console.log(data);
          //console.log("./public/modules/main/dlc/Induction_Material/"+data.lastModified+"-"+data.name);

        }
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
        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}  />
    }
}

// function mapStateToProps(state,ownProps){
//   console.log("inside dropzonejs page");
//   return {
//     quicklinks:state.quicklinks
//   };
// }
// export default connect(mapStateToProps)(DropZone);
