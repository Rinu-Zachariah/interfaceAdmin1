export default function historyReducer(state =[], action){
  switch(action.type){
    case 'GET_HISTORY':{
      const newState = Object.assign([], state, action.history);
      return newState;
    }
    case 'CREATE_HISTORY': return[...state, Object.assign({}, action.history)];

    default: return state;
  }

}
