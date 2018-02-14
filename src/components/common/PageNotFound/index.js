import React, { PureComponent } from 'react'

const NOT_FOUND_MESSAGE = 'We searched for your page everywhere. But, we can\'t find it.'

export default class PageNotFoundComponent extends PureComponent {
  render() {
    return (
      <div>
        {NOT_FOUND_MESSAGE}
      </div>)
  }
}
