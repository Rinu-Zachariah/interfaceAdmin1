import {createStore} from 'redux';
import rootReducer from '../reducer/index';


export default function configureStore(initialState){
  console.log(initialState);
  return createStore(rootReducer, initialState, window.devToolsExtension && window.devToolsExtension());
}
