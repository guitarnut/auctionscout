import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect } from 'react-router';

import { isAuthorized } from '../common/authentication';

/**
 * Renders a route for a component that provides authentication.
 * The route will redirect to the users page when authentication is not needed.
 *
 * @param   {Function} component
 * @param   {...*}     rest
 * @returns {Object}
 */
function RouteAuth({ component: Component, ...rest }) {

  let render = props => (
    isAuthorized() ? (
      <Redirect
        to={ {
          pathname: '/users',
          state: { referrer: props.location }
        } }
      />
    ) : (
      <Component { ...props } />
    )
  );

  return (
    <Route { ...rest } render={ render }/>
  );
}

RouteAuth.propTypes = {
  component: PropTypes.elementType.isRequired
};


export default RouteAuth;
