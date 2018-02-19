import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { ListComponent } from '../../components'

export const APP_ROUTE = '/'
export const APP_ROUTE_NAME = 'Home'

export const AppRoutes = props => (
  <Switch>
    <Route
      path="*"
      component={MovieListContainer}
    />
    <Route
      exact
      name={}
      path={/'movies/:id'}
      componentRef={MovieDetailsContainer}
    />
  </Switch>
)

AppRoutes.propTypes = {
  name: PropTypes.string.isRequired,
}
