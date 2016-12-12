export default function adminReducer(state =[], action){
  switch(action.type){
    case 'GET_ADMIN':{

      const newState = Object.assign([], state);
      $.ajax({
              url: 'http://localhost:4000/admins',
              method: 'GET',
              dataType: 'JSON',
              success: function(response) {
                console.log(response);
                newState.push(response);
                return newState;
              }
          })
      //browserHistory.push('/cats');

    }

    default: return state;
  }
}
