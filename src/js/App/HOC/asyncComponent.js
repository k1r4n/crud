import React, {Suspense, Component} from 'react';

const AsyncComponent = (ComposedComponent) => {
  return class LazyComponent extends Component {
    render() {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <ComposedComponent {...this.props} />
        </Suspense>
      );
    }
  };
};

export default AsyncComponent;

