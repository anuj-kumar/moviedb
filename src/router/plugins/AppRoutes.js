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
      path="/view"
      component={view}
    />
    <Route
      path="*"
      component={list}
    />
  </Switch>
)

AppRoutes.propTypes = {
  name: PropTypes.string.isRequired,
}
