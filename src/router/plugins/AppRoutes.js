import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { PageNotFound, DateSelector, TimeSelector, Login } from '../../components'

export const APP_ROUTE = '/'
export const APP_ROUTE_NAME = 'Home'

export const AppRoutes = props => (
  <Switch>
    <Route
      exact
      path="/date"
      component={DateSelector}
    />
    <Route
      exact
      path="/login"
      component={Login}
    />
    <Route
      exact
      path="/time"
      component={TimeSelector}
    />
    <Route
      path="*"
      component={PageNotFound}
    />
  </Switch>
)

AppRoutes.propTypes = {
  name: PropTypes.string.isRequired,
}
