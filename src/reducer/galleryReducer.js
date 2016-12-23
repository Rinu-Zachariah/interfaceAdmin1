export default function galleryReducer(state =[], action){
  switch(action.type){
    case 'GET_GALLERY':{
      const newState = Object.assign([], state, action.gallery);
      return newState.reverse();
    }
    case 'CREATE_GALLERY': return[...state, Object.assign({}, action.gallery)];

    default: return state;
  }
}
