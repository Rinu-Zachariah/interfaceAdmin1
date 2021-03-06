export default function pollReducer(state =[], action){
  switch(action.type){
    case 'GET_POLLS':{
      const newState = Object.assign([], state, action.poll);
      return newState.reverse();
    }
    case 'CREATE_POLLS':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.poll);
        return newState.reverse();
    }
    case 'DELETE_POLLS': {

      const newState = Object.assign([], state);
      const indexOfPollToDelete = state.findIndex(poll => {return poll._id == action.poll._id;});
      newState.splice(indexOfPollToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }
}
