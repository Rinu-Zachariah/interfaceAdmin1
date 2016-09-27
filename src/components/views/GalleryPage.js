import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as galleryActions from '../../actions/galleryActions';


class GalleryPage extends Component{
  render(){
    return (
      <div>
        <h1>Gallery</h1>
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
