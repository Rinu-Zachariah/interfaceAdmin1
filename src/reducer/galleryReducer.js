export default function galleryReducer(state =[], action){
  switch(action.type){
    case 'GET_GALLERY':{
      const newState = Object.assign([], state, action.gallery);
      return newState.reverse();
    }
    case 'CREATE_GALLERY': return[...state, Object.assign({}, action.gallery)];

    case 'DELETE_GALLERY': {
      const newState = Object.assign([], state);
      const indexOfEventToDelete = state.findIndex(gallery => {return gallery._id == action.gallery._id;});
      newState.splice(indexOfEventToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }

}
