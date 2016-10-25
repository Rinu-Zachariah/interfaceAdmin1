import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

export default class DropZone extends Component{
    constructor(props) {
        super(props);

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
            postUrl: 'http://localhost:4000/upload'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
      //  this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (data) => {
          console.log(data);
          console.log(this.props);
          //console.log("./public/modules/main/dlc/Induction_Material/"+data.lastModified+"-"+data.name);

          let url = "./public/modules/main/dlc/Induction_Material/"+data.lastModified+"-"+data.name;
          console.log(url);

          return url;

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
        console.log(eventHandlers);
        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    }
}
