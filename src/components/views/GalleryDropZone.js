import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import {connect} from 'react-redux';
import * as galleryActions from '../../actions/galleryActions';
import env from '../../environment';
import init from '../../../tools/init';
import dropZoneStyles from '../../css/dropzone.css';
import moment from 'moment';
let photos = [];
 class GalleryDropZone extends Component{
    constructor(props) {
        super(props);
        this.onAlbumNameChange = this.onAlbumNameChange.bind(this);
        this.onAlbumDesChange = this.onAlbumDesChange.bind(this);
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
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: env[init.env()].uploadGalleryImages
        };
        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
      //  this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (data) => {
          let photo = {};
          photo.imagePath = "modules/main/img/gallery/"+data.name;
          photo.photo_description = data.name;
          photos.push(photo);
          const gallery = this.state.gallery;
          gallery.photos = photos;
          this.setState({gallery: gallery});
        };

        this.state = {
          gallery: {album_description: '',
          album_name: '',
          created_at: '',
          photos:[]
          }
        };
    }

    componentWillUpdate(nextProps, nextState) {
      nextState.invalidData = !(nextState.gallery.album_name && nextState.gallery.album_description);
    }

    onAlbumNameChange(event){
      const gallery = this.state.gallery;
      gallery.album_name = event.target.value;
      this.setState({gallery: gallery});
    }

    onAlbumDesChange(event){
      const gallery = this.state.gallery;
      gallery.album_description = event.target.value;
      this.setState({gallery: gallery});
    }

    onClickSave(){
      const propObject = this;
      const clearText = this.refs.clearText;
      const gallery = {album_description: '',
        album_name: '',
        created_at: '',
        photos:[]
      }
      photos = [];

      $.ajax({
        type: "POST",
        url: env[init.env()].gallery,
        data: this.state.gallery,
        success: function(data){
          propObject.setState({gallery: gallery});
          propObject.props.dispatch(galleryActions.createGallery(data));
        },
        error: function(data){
          alert('error');
        }
      });

    }

  //   handleFileAdded(file) {
  //     $.ajax({
  //         url: env[init.env()].uploadGalleryImages,
  //         data: file,
  //         processData: false,
  //         contentType: false,
  //         type: 'POST',
  //         success: function(data){
  //             alert(data);
  //         }
  //     });
  //  }



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
          <td><input ref="clearText" id="clearText" className="form-control" onChange={this.onAlbumNameChange} value={this.state.gallery.album_name}/></td>
          <td><input ref="clearAlbumText" id="clearAlbumText" className="form-control" onChange={this.onAlbumDesChange} value={this.state.gallery.album_description}/></td>
          <td><button className="btn btn-primary" onClick={this.onClickSave} value="save" disabled={this.state.invalidData}>Add Event</button></td>
          </tr>
        );

    }
}

function mapStateToProps(state,ownProps){
  return {
    gallery: state.gallery
  };
}
export default connect(mapStateToProps)(GalleryDropZone);
