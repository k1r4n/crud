import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import App from './App';
import store from './store';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/stylesheets/main.scss';

render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));
