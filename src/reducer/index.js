import {combineReducers} from 'redux';
import histories from './historyReducer';
import events from './eventsReducer';
import poll from './pollReducer';
import quicklinks from './quicklinksReducer';
import gallery from './galleryReducer';
import mandatorytrainings from './mandatorytrainingsReducer';
import successstories from './successReducer';

const rootReducer = combineReducers({
    histories ,events, poll, quicklinks, gallery, mandatorytrainings,successstories
  });

export default rootReducer;
