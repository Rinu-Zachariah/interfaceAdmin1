export default function pollReducer(state =[], action){
  switch(action.type){
    case 'CREATE_POLLS': return[...state, Object.assign({}, action.poll)];

    default: return state;
  }
}
