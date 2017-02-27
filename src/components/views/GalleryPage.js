import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as galleryActions from '../../actions/galleryActions';
import env from '../../environment';
import init from '../../../tools/init';
import ComingSoonImg from '../../images/wip.png';
import GalleryDropZone from './GalleryDropZone';
import GalleryAccordion from './GalleryAccordion';

class GalleryPage extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      gallery: {album_description: '',
      album_name: '',
      created_at: '',
      photos:[]
      }
    };
    this.onDeleteAlbum = this.onDeleteAlbum.bind(this);
    this.galleryRow = this.galleryRow.bind(this);
  }

  onDeleteAlbum(gallery){
    const propObject = this.props;
    $.ajax({
    url: env[init.env()].gallery,
    type: "DELETE",
    data: gallery,
    success: function(data){
      propObject.deleteGallery(data);
    }
  });

  }

  componentDidMount() {
    const propObject = this.props;
    $.get(env[init.env()].gallery, function(data){
      propObject.getGallery(data);
    });
  }

  galleryRow(gallery,index){
    return(
      <div key={index}>
      <GalleryAccordion title={gallery.album_name} photos={gallery.photos} index={index}/>
      <button className="btn btn-danger" onClick={()=>{this.onDeleteAlbum(gallery)}} value="delete">Remove</button>
      </div>
    );
  }

  render(){
    return (
      <div>
      <h2>GALLERY</h2>
      <div className="table-responsive">
      <table className="table table-responsive table-sm">
        <thead>
          <tr>
            <th>Photos</th>
            <th>Album Name</th>
            <th>Album Description</th>
          </tr>
        </thead>
        <tbody>
          <GalleryDropZone/>
        </tbody>
      </table>
      </div>
      <div>
        {this.props.gallery.map(this.galleryRow)}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return {
    gallery: state.gallery
  };
}

export default connect(mapStateToProps, galleryActions)(GalleryPage);
