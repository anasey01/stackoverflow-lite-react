import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Components from '../components/IndexComponent';
import '../components/styles/styles.scss';

const history = createHistory();

const {
  Header,
  Footer,
  NotFound,
  Signup,
  Login,
  Home,
  CreateQuestion,
  SingleQuestion,
  Logout,
} = Components;


class RouteComponent extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header history={history}/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/createquestion" component={CreateQuestion} />
            <Route path="/questions/:id" component={SingleQuestion} />
            <Route path="/logout" component={Logout} />
            <Route path="/recent-questions" component={Home} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default RouteComponent;
