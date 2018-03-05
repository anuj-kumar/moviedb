import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

@inject('applicationModel')
@observer
export default class Loader extends Component {
  render() {
    return (
      <div className='loader'>
      </div>
    )
  }
}
