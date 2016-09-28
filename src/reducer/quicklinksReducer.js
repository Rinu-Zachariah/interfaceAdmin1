export default function quicklinksReducer(state =[], action){
  switch(action.type){
    case 'CREATE_QUICKLINKS': return[...state, Object.assign({}, action.quicklinks)];

    default: return state;
  }
}
