export default function eventsReducer(state =[], action){
  switch(action.type){
    case 'CREATE_EVENTS':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.event);
        return newState.reverse();
    }
    case 'DELETE_EVENTS': {

      const newState = Object.assign([], state);
      //console.log(newState);
      const indexOfEventToDelete = state.findIndex(event => {return event._id == action.event._id;});
      newState.splice(indexOfEventToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }
}
