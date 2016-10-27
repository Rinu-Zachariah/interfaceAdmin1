export default function mandatorytrainingsReducer(state =[], action){
  switch(action.type){
    case 'CREATE_MANDATORYTRAININGS':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.mandatorytrainings);
        return newState.reverse();
    }

    case 'DELETE_MANDATORYTRAININGS': {

      const newState = Object.assign([], state);
      //console.log(newState);
      const indexOfEventToDelete = state.findIndex(mandatorytrainings => {return mandatorytrainings._id == action.mandatorytrainings._id;});
      newState.splice(indexOfEventToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    case 'IS_EDITING_MANDATORYTRAININGS': {
      const newState = Object.assign([], state);
      const indexOfEventToDelete = state.findIndex(mandatorytrainings => {return mandatorytrainings._id == action.mandatorytrainings._id});
      newState[indexOfEventToDelete].isEditing = true;
      return newState;
    }

    case 'EDIT_MANDATORYTRAININGS': {
      const newState = Object.assign([], state);
      const indexOfEventToEdit = state.findIndex(mandatorytrainings => {return mandatorytrainings._id == action.mandatorytrainings._id});
      newState[indexOfEventToEdit] = action.mandatorytrainings;
      return newState;
    }


    default: return state;
  }
}
