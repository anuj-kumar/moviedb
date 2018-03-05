import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { AppRouter } from '../../router'
import { LoaderComponent } from '../../components'

@inject('applicationModel')
@observer
export class AppContainer extends Component {
  componentDidCatch(error) {
    console.log('error..', error)
  }

  render() {
    const { applicationModel } = this.props
    if (applicationModel.application && applicationModel.application.loader) {
      return (
        <p>Loading ...</p>
      )
    }
    return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    )
  }
}
