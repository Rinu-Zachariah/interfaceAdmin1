export default function eventsReducer(state =[], action){
  switch(action.type){
    case 'CREATE_EVENTS': return[...state, Object.assign({}, action.event)];

    default: return state;
  }
}
