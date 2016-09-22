export default function historyReducer(state =[], action){
  switch(action.type){
    case 'CREATE_HISTORY': return[...state, Object.assign({}, action.history)];

    default: return state;
  }
}
