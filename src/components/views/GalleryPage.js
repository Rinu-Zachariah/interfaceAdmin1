import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as galleryActions from '../../actions/galleryActions';


class GalleryPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      gallery: {album_description: '',
      album_name: '',
      created_at: '',
      photos:{
        imagePath:'',
        photo_description:'',
      }
      }
    };
  }

  galleryRow(event,index){
    return(
      <tr key={index}>
        <td>{event.album_description}</td>
        <td>{event.album_name}</td>
        <td>{event.created_at.split("T")[0]}</td>
        <td>
        <ul>
        <li>{event.photos.imagePath}</li>
        <li>{event.photos.photo_description}</li>
        </ul>
        </td>
        <td><button className="btn btn-danger">Remove</button></td>
        <td><button className="btn btn-warning">Edit</button></td>
      </tr>
    )
  }

  render(){
    return (
      <div>
      <h2>GALLERY</h2>
      <p className="blue">Add Delete or Edit Polls</p>
      <table style={{textAlign:"left"}}className="table">
        <thead>
          <tr>
            <th>Album Description</th>
            <th>Album Name</th>
            <th>Created At</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input className="form-control"/></td>
            <td><input className="form-control"/></td>
            <td><input className="form-control"/></td>
            <td><input className="form-control"/></td>
            <td><button className="btn btn-primary" onClick={this.onClickSave} value="save">Add Event</button></td>
          </tr>
          {this.props.gallery.map(this.galleryRow)}
        </tbody>
      </table>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log("Inside gallery")
  console.log(state.gallery)
  return {
    gallery: state.gallery
  };
}

export default connect(mapStateToProps)(GalleryPage);
