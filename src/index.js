import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RouteComponent from './route/RouteComponent';
import store from './redux/store/index';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouteComponent />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
