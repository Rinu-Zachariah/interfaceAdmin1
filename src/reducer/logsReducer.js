export default function logsReducer(state =[], action){
  console.log("inside logsReducer");
  console.log(action);
  switch(action.type){

    case 'GET_LOGS':{
      const newState = Object.assign([], state, action.logs);
      return newState;

    }


  }
}
