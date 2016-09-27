export default function mandatorytrainingsReducer(state =[], action){
  switch(action.type){
    case 'CREATE_MANDATORYTRAININGS': return[...state, Object.assign({}, action.mandatorytrainings)];

    default: return state;
  }
}
