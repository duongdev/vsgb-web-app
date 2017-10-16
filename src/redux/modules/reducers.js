import { firebaseStateReducer } from 'react-redux-firebase';
import app from './app';
import posts from './posts';

// Add firebase to reducers
const rootReducer = {
  firebase: firebaseStateReducer,
  app,
  posts,
};

export default rootReducer;
