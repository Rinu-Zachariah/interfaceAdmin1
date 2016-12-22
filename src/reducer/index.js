import {combineReducers} from 'redux';
import histories from './historyReducer';
import events from './eventsReducer';
import poll from './pollReducer';
import quicklinks from './quicklinksReducer';
import gallery from './galleryReducer';
import mandatorytrainings from './mandatorytrainingsReducer';
import admins from './adminReducer';
import logs from './logsReducer';
import download from './downloadReducer';


const rootReducer = combineReducers({
    histories ,events, poll, quicklinks, gallery, mandatorytrainings, admins
  });

export default rootReducer;
