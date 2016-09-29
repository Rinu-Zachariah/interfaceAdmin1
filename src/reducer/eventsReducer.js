export default function eventsReducer(state =[], action){
  switch(action.type){
    case 'CREATE_EVENTS': return[...state, Object.assign({}, action.event)];
    case 'DELETE_EVENTS': {
      const newState = Object.assign([], state);
      const indexOfEventToDelete = state.findIndex(event => {return event._id == action.event._id})
      newState.splice(indexOfEventToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }
}
