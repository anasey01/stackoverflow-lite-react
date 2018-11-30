import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from "../components/signup";
import Home from '../components/Home';
import NotFound from '../components/404';
import Header from '../components/static/Header';
import Footer from '../components/static/Footer';

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
                <Route component={NotFound} />
              </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      );
    }
  }
  
 export default RouteCompnent;
