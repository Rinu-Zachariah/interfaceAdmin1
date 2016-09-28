export default function historyReducer(state =[], action){
  console.log("inside history reducer");
   console.log(state);
  switch(action.type){
    case 'CREATE_HISTORY': return[...state, Object.assign({}, action.history)];

    default: return state;
  }

}
