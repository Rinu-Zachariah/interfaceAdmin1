import {combineReducers} from 'redux';
import histories from './historyReducer';
import events from './eventsReducer';
import poll from './pollReducer';


const rootReducer = combineReducers({
    histories , events, poll
  });

export default rootReducer;
