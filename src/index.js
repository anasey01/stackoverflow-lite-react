import React from 'react';
import ReactDOM from 'react-dom';
import RouteComponent from './route/RouteComponent';

class App extends React.Component {
    
    render() {
      
      return (
        <RouteComponent />
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('app'));