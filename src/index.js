import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from "./components/container/FormContainer";
import './styles.scss';

class App extends React.Component {
    
    render() {
      
      return (
        <div className="app">
          <FormContainer />
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('app'));