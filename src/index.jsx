import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, Redirect } from 'react-router';
import { history } from './js/common/history';
import './css/auctionscout.scss?global';
import UserLayout from './js/components/static/userlayout';
import PageNotFound from './js/components/static/page_notfound';
import { isAuthorized } from "./js/common/authentication";
import Login from "./js/components/user/login";
import RouteAuth from "./js/route/route_auth";
import { PrivateRoute } from "./js/route/route_private";

function App() {
  return (
    <Router history={ history }>
      <Switch>
        <Redirect from='/' to='/login' exact />
        <PrivateRoute path='/app' component={ UserLayout }/>
        <RouteAuth path='/login' exact component={ Login } />
        { /*<AuthRoute path='/' exact component={ Login } />*/ }
        { /*<AuthRoute path='/login' component={ Login } />*/ }
        { /*<AuthRoute path='/forgot' component={ Forgot } />*/ }
        { /*<Route path='/logout' component={ Logout } />*/ }
        <Route component={ PageNotFound }/>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App/>, document.querySelector("#root"));
