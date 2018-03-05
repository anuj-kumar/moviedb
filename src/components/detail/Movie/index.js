import React, { Component } from 'react'
import { CacheService, getMovieDetails } from '../../../services'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Loader } from '../../loader'


@inject('movieModel', 'applicationModel')
@observer
export default class Detail extends Component {
  componentWillMount() {
    const { applicationModel, movieModel, match : { params } } = this.props
    movieModel.init()
    movieModel.fetchMovie(applicationModel, params.id)
  }
  renderRating(movieDetail) {
    if (movieDetail.rating) {
      return 'Rating: ' + movieDetail.rating + '/ 10'
    }
    return ''
  }

  render() {
    const { applicationModel, movieModel : { movie } } = this.props
    if (applicationModel.application.loader) {
      return (
        <Loader/>
        )
    }
    let movieDetail = toJS(movie)
    return (
      <div>
        <h1>{movieDetail.title}</h1> <h3>{movieDetail.year}</h3>
        <p>{ this.renderRating(movieDetail) }</p>
        <p>{movieDetail.genre}</p>
      </div>
    )
  }
}
