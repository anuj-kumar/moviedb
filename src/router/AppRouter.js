import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { AppRoutes, APP_ROUTE_NAME } from './plugins'
import { List, Detail, Loader, PageNotFound } from '../components'
import { MovieDetailsCotainer } from '../containers'

const AppRouter = props => (
  <div>
      <Switch>
        <Route exact path="/" name={APP_ROUTE_NAME} component={List}/>
        <Route exact path="/view/:id" component={Detail}/>
        <Route exact path="/loader" component={Loader}/>
        <Route path="*" name={404} component={PageNotFound}/>
      </Switch>
  </div>
)

export default AppRouter
