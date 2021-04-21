import {combineReducers} from 'redux';

import ApiCallingReducers from './ApiCallingReducers';

export default combineReducers({
  response:ApiCallingReducers
})
