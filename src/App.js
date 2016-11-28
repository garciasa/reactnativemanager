import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';


import reducers from './reducers';
import RouterComponent from './Router';

class App extends React.Component {
  componentWillMount() {
    var config = {
      apiKey: '',
      authDomain: 'manager-b3af5.firebaseapp.com',
      databaseURL: 'https://manager-b3af5.firebaseio.com',
      storageBucket: 'manager-b3af5.appspot.com',
      messagingSenderId: '999485462004'
    };
    firebase.initializeApp(config);
  }
  render() {
                                    //initial state
    const store = createStore(reducers,{},applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }

}

export default App;
