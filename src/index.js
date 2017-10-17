import React from 'react';
import ReactDOM from 'react-dom';
import RootContainer from 'containers/root';
import { AppContainer } from 'react-hot-loader';
import firebase from 'firebase';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import reducers from 'redux/modules/reducers';

import 'jquery';
import 'assets/jquery-ui.min.js'

// import registerServiceWorker from './registerServiceWorker';

const fireBaseConfig = {
  apiKey: "AIzaSyCQp_PfjcZ5hHfGCD0uWeN7uamuzMnhWig",
  authDomain: "mac-pro-ebf51.firebaseapp.com",
  databaseURL: "https://mac-pro-ebf51.firebaseio.com",
  projectId: "mac-pro-ebf51",
  storageBucket: "mac-pro-ebf51.appspot.com",
  messagingSenderId: "443723329218",
};

firebase.initializeApp(fireBaseConfig);

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk.withExtraArgument(getFirebase)];
const enhancers = [reactReduxFirebase(fireBaseConfig, {
  userProfile: 'users', enableLogging: false
})];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const initialState = {};

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers
  }),
  initialState,
  composedEnhancers
);

const render = RootContainer => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <RootContainer />
      </AppContainer>
    </Provider>,
    document.querySelector('#root')
  );
};
render(RootContainer);

// Enable hmr
if (module.hot) {
  module.hot.accept('./containers/root', () => {
    try {
      render(require('./containers/root').default);
    } catch (err) {}
  });
}

// registerServiceWorker();
