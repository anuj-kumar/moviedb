import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { AppRouter } from '../../router'
import { LoaderComponent } from '../../components'

@inject('movieModel')
@observer
export class MovieDetailsContainer extends Component {
  componentDidCatch(error) {
    console.log('error..', error)
  }

  render() {
    const { movieModel } = this.props
    return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    )
  }
}
