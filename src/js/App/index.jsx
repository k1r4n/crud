import React, {Component} from 'react';

import Routes from './Routes';
import propsWithQuery from './HOC/propsWithQuery';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Routes />
      </div>
    );
  }
}

export default propsWithQuery(App);
