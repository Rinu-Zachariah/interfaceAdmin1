import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import * as galleryActions from '../../actions/galleryActions';
import env from '../../environment';
import init from '../../../tools/init';

const styles = {
  active: {
    display: 'inherit'
  },
  inactive:{
    display: 'none'
  }
};

class GalleryAccordion extends React.Component {
  constructor() {
  super();
  this.state = {
    active: false
  };
  this.toggle = this.toggle.bind(this);
  this.onDeleteGallery = this.onDeleteGallery.bind(this);
  this.showPhotos = this.showPhotos.bind(this);
  }

    toggle() {
      this.setState({
        active: !this.state.active
      });
    }

    onDeleteGallery(photo, index){
      const propObject = this.props;
      $.ajax({
        url: env[init.env()].uploadGalleryImages+'/'+ propObject.gallery[propObject.index]._id ,
        type: 'DELETE',
        data: photo,
        success: function(data){
          console.log(data);
          propObject.getGallery(data);
        }
      });
    }

    showPhotos(photo,index){
      let baseUrl="http://localhost:4000/";

      return(
        <div key={index}  className="imageThumbnail col-md-4">
        <img src={baseUrl+photo.imagePath} className="img-rounded" alt={photo.photo_description} width="268" height="200"/>
        <a className="col-md-offset-10" onClick={()=>{this.onDeleteGallery(photo, index)}} value="delete">Delete</a>
        </div>
      );
    }

  render(){
  const stateStyle = this.state.active ? styles.active : styles.inactive;
  return (
        <section className="accordionContainer">
          <div className="heading">
            <a onClick={this.toggle}>
              {this.props.title}
            </a>
          </div>
          <div style={stateStyle} className="mainContent">
              {this.props.photos.map(this.showPhotos)}
          </div>
        </section>
      );
  }

}

GalleryAccordion.propTypes ={
  title: React.PropTypes.string,
  photos: React.PropTypes.array,
  index: React.PropTypes.number
  //event1:React.PropTypes.object
};

function mapStateToProps(state,ownProps){
  return {
    gallery:state.gallery
  };
}

export default connect(mapStateToProps,galleryActions)(GalleryAccordion);
