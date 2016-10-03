export default function quicklinksReducer(state =[], action){
  switch(action.type){
    case 'CREATE_QUICKLINKS': {
      const newState = Object.assign([], state.reverse());
      newState.push(action.event);
      return newState.reverse();
    }
    default: return state;
  }
}
