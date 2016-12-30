export default function quicklinksReducer(state =[], action){
  switch(action.type){

    case 'CREATE_QUICKLINKS':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.quicklinks);
        return newState.reverse();
    }

    case 'DELETE_QUICKLINKS': {

      const newState = Object.assign([], state);
      const indexOfEventToDelete = state.findIndex(quicklinks => {return quicklinks._id == action.quicklinks._id;});
      newState.splice(indexOfEventToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    case 'IS_EDITING_QUICKLINKS': {
      const newState = Object.assign([], state);
      const indexOfEventToDelete = state.findIndex(quicklinks => {return quicklinks._id == action.quicklinks._id;});
      newState[indexOfEventToDelete].isEditing = true;
      return newState;
    }

    case 'EDIT_QUICKLINKS': {
      const newState = Object.assign([], state);
      const indexOfEventToEdit = state.findIndex(quicklinks => {return quicklinks._id == action.quicklinks._id;});
      newState[indexOfEventToEdit] = action.quicklinks;
      return newState;
    }

    case 'GET_INDUCTION':{
      console.log("inside GetInduction");
      const newState = Object.assign({}, state, action.induction);
      console.log(newState);
      return newState;

    }

    default: return state;
  }
}
