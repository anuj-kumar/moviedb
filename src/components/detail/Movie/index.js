import React, { Component } from 'react'
import { CacheService, getMovieDetails } from '../../../services'
import { inject, observer } from 'mobx-react'

@inject('movieModel')
@observer
export default class Detail extends Component {
  componentWillMount(){
    const { movieModel, match : { params } } = this.props
    movieModel.fetchMovie(params.id)
  }
  renderItem(index, key) {
    return <div key={key.toString()}>{key}</div>;
  }
  render() {
    const { movieModel : { movie } } = this.props
    let movieDetail = {title: 'Hi'}
    return (
      <div>
        <h1>{movieDetail.title}</h1>
        <h2>yay</h2>
      </div>
    )
  }
}
