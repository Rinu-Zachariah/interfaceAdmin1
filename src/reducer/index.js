import {combineReducers} from 'redux';
import histories from './historyReducer';
import events from './eventsReducer';
import poll from './pollReducer';
import induction from './quicklinksReducer';
import mandatorytrainings from './mandatorytrainingsReducer';
import gallery from './galleryReducer';
import admins from './adminReducer';
import successstories from './successReducer';
import contributors from './contributorReducer';

const rootReducer = combineReducers({
    histories ,events, poll, induction, mandatorytrainings, gallery,successstories,contributors, admins, logs: (state = {}) => state,downloads: (state = {}) => state

  });

export default rootReducer;
