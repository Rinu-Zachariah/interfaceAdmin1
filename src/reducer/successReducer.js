export default function successReducer(state =[], action){
  switch(action.type){

    case 'DELETE_STORIES': {

      const newState = Object.assign([], state);
      const indexOfStoryToDelete = state.findIndex(successstory => {return successstory._id == action.successstory._id;});
      newState.splice(indexOfStoryToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }
}
