export default function eventsReducer(state =[], action){
  switch(action.type){
    case 'GET_EVENTS':{
      const newState = Object.assign([], state, action.event);
      return newState.reverse();
    }
    case 'CREATE_EVENTS':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.event);
        return newState.reverse();
    }
    case 'DELETE_EVENTS': {
      const newState = Object.assign([], state);
      const indexOfEventToDelete = state.findIndex(event => {return event._id == action.event._id;});
      newState.splice(indexOfEventToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }
    case 'IS_EDITING_EVENTS': {
      const newState = Object.assign([], state);
      const indexOfEventToDelete = state.findIndex(event => {return event._id == action.event._id;});
      newState[indexOfEventToDelete].isEditing = true;
      return newState;
    }

    case 'EDIT_EVENTS': {
      const newState = Object.assign([], state);
      const indexOfEventToEdit = state.findIndex(event => {return event._id == action.event._id;});
      newState[indexOfEventToEdit] = action.event;
      return newState;
    }

    default: return state;
  }
}
