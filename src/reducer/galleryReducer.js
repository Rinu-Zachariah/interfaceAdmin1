export default function galleryReducer(state =[], action){
  switch(action.type){
    case 'CREATE_GALLERY': return[...state, Object.assign({}, action.gallery)];

    default: return state;
  }
}
