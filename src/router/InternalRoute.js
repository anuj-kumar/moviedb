import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { isFunction } from 'lodash'

import { getUserType } from '../utils'

/**
 * This route is used to redirect to a specific path based on a the fact that the redirection is valid or not.
 * @param isValidRedirection: if true, represents a valid redirection
 * @param redirectToPath: the path the user is to be redirected to is redirection is not valid
 * @param properties: rest of the properties, like routes one must declare one of (component, render or children)
 */
const InternalRoute = inject('internalRoutingModel')(observer(({
  internalRoutingModel, isValidRedirection = true, redirectToPath, ...properties
}) => {
  // update the breadcrumbs in store
  internalRoutingModel.setRoute(properties.name)

  return (<Route
    exact
    {...properties}
    render={props => {
      // supports render, children and component properties
      let componentToBeRendered
      // eslint-disable-next-line no-constant-condition
      if (isValidRedirection) {
        const { render: renderMethod, children, componentRef, authenticate } = properties
        const finalProps = {
          ...props,
          ...(properties || {}),
        }
        if (renderMethod && isFunction(renderMethod)) {
          componentToBeRendered = renderMethod(finalProps)
        }
        else if (children && isFunction(children)) {
          componentToBeRendered = children()
        }
        else if (componentRef) {
          if ((authenticate && authenticate.length && authenticate.indexOf(getUserType()) > -1) || !authenticate) {
            const TargetComponent = componentRef
            componentToBeRendered = (<TargetComponent {...finalProps} />)
          } else {
            componentToBeRendered = null
          }
        }
        else {
          throw new Error('When using internal route, one of component, render or children must be supplied.')
        }
      }
      else {
        componentToBeRendered = (<Redirect to={redirectToPath} />)
      }
      return componentToBeRendered
    }}
  />)
},
))

InternalRoute.propTypes = {
  isValidRedirection: PropTypes.bool.isRequired,
  redirectToPath: PropTypes.string.isRequired,
}

export default InternalRoute
