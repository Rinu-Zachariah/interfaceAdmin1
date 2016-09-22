import {combineReducers} from 'redux';
import histories from './historyReducer';

const rootReducer = combineReducers({
    histories
});

export default rootReducer;
