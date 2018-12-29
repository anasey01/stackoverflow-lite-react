import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Components from '../components/IndexComponent';

const {
  Header,
  Footer,
  NotFound,
  Signup,
  Login,
  Home,
  
} = Components;


import '../stylesheets/styles.scss';

class RouteCompnent extends React.Component {
    
    render() {
      
      return (
        <BrowserRouter>
          <div>
            <Header />
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      );
    }
  }
  
 export default RouteCompnent;
