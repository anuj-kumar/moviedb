import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { AppRouter } from '../../router'
import { Loader } from '../../components'

export class AppContainer extends Component {
  componentDidCatch(error) {
    console.log('error..', error)
  }
  render() {
    return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    )
  }
}
