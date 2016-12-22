import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as galleryActions from '../../actions/galleryActions';
import env from '../../environment';
import init from '../../../tools/init';
import ComingSoonImg from '../../images/wip.png';

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
    );
  }

  render(){
    return (
      <div>
      <h2>GALLERY</h2>
      <center>
        <img src={ComingSoonImg} />
        <div className="row">
          <span className="sub-heading-small">Page coming soon! Stay Tuned!</span>
        </div>
      </center>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log("Inside gallery");

  return {
    gallery: state.gallery
  };
}

export default connect(mapStateToProps)(GalleryPage);
