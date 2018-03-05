import React, { Component } from 'react'
import { CacheService, getMovieDetails } from '../../../services'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

@inject('movieModel')
@observer
export default class Detail extends Component {
  componentWillMount(){
    const { movieModel, match : { params } } = this.props
    movieModel.fetchMovie(params.id)
  }
  render() {
    const { movieModel : { movie } } = this.props
    let movieDetail = toJS(movie)
    return (
      <div>
        <h1>{movieDetail.title}</h1> <h3>{ movieDetail.year }</h3>
        <p>Rating: {movieDetail.rating} / 10 </p>
        <p>{movieDetail.genre}</p>
      </div>
    )
  }
}
