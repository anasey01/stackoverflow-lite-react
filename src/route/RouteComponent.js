import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Components from '../components/IndexComponent';
import '../components/styles/styles.scss';

const {
  Header,
  Footer,
  NotFound,
  Signup,
  Login,
  Home,
  CreateQuestion,
} = Components;


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
            <Route path="/createquestion" component={CreateQuestion} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default RouteCompnent;
