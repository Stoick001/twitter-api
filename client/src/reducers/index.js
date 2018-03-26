import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import tweetsReducer from './tweetsReducer';

export default combineReducers({
  auth: authReducer,
  tweets: tweetsReducer,
  form: reduxForm,
});
