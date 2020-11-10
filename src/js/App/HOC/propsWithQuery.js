import React from 'react';
import queryString from 'query-string';

import UrlContext from '../../context';

const propsWithQuery = (ComposedComponent) => {
  return class QueryChange extends React.Component {
    state = {
      query: {},
    };

    componentDidMount() {
      this.handleUrlChange();
      window.addEventListener('popstate', this.handleUrlChange);
    }

    componentWillUnmount() {
      window.removeEventListener('popstate', this.handleUrlChange);
    }

    handleUrlChange = () => {
      const query = queryString.parse(location.search);
      this.setState({query});
    }

    render() {
      const {query} = this.state;
      return (
        <UrlContext.Provider value={query}>
          <ComposedComponent />
        </UrlContext.Provider>
      );
    }
  };
};

export default propsWithQuery;
