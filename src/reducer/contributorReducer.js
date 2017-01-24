export default function contributorsReducer(state =[], action){
  switch(action.type){

    case 'DELETE_CONTRI': {

      const newState = Object.assign([], state);
      console.log(action._id);
      const indexOfcontributorsToDelete = state.findIndex(contributor => {return contributor._id == action.contributor._id;});
      newState.splice(indexOfcontributorsToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }
   case 'CREATE_CONTRI':{
            const newState = Object.assign([], state.reverse());
            console.log(action.contributor);
            newState.push(action.contributor);
            return newState.reverse();
   }

   case 'IS_EDITING_CONTRI': {
     const newState = Object.assign([], state);
     console.log(state.contributors);
     const indexOfEventToDelete = state.findIndex(contributor => {return contributor._id == action.contributor._id;});
     newState[indexOfEventToDelete].isEditing = true;
     return newState;
   }
   case 'EDIT_CONTRIBUTORS': {
     const newState = Object.assign([], state);
     const indexOfEventToEdit = state.findIndex(contributor => {return contributor._id == action.contributor._id;});
     newState[indexOfEventToEdit] = action.contributor;
     return newState;
   }


    default: return state;
  }
}
