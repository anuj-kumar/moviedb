import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { ListComponent } from '../../components'
import { MovieDetailsContainer } from '../../containers'

export const APP_ROUTE = '/'
export const APP_ROUTE_NAME = 'Home'

export const AppRoutes = props => (
  <Switch>
    <Route
      path="/list"
      component={ListComponent}
    />
    <Route
      path={'${match.url}/:id'}
      component={MovieDetailsContainer}
    />
  </Switch>
)

AppRoutes.propTypes = {
  name: PropTypes.string.isRequired,
}
