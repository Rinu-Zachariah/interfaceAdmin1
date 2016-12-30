
export default function adminReducer(state =[], action){
  switch(action.type){

    case 'GET_ADMIN':{
      const newState = Object.assign([], state, action.admin);
      return newState;

    }

    case 'CREATE_ADMIN':{
        const newState = Object.assign([], state.reverse());
        newState.push(action.admin);
        return newState.reverse();
    }

    case 'DELETE_ADMIN': {
      const newState = Object.assign([], state);
      const indexOfAdminToDelete = state.findIndex(admins => {return admins._id == action.admin._id;});
      newState.splice(indexOfAdminToDelete, 1);
      //browserHistory.push('/cats');
      return newState;
    }

    default: return state;
  }
}
