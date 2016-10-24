export default function pollReducer(state =[], action){
  switch(action.type){
    case 'CREATE_POLLS':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.poll);
        return newState.reverse();
    }
    case 'DELETE_POLLS': {

      const newState = Object.assign([], state);
      //console.log(newState);
      const indexOfPollToDelete = state.findIndex(poll => {return poll._id == action.poll._id;});
      newState.splice(indexOfPollToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }
}
