import React from 'react'
import { InternalRoute } from '.'

/**
 * This route is used to redirect to a specific path based on the fact that user is authenticated or not.
 * @param properties: rest of the properties, like routes one must declare one of (component, render or children)
 */
const Authenticated = ({ ...properties }) => {
  // TODO: [Gaurav] update this logic to check if the user is authenticated
  const isValidRedirection = true
  return (
    <InternalRoute
      isValidRedirection={isValidRedirection}
      redirectToPath="/login"
      {...properties}
    />)
}

export default Authenticated
